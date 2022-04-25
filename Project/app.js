const path = require("path");

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const gameRoutes = require("./routes/games.js");
const joinRoutes = require("./routes/join-us.js");
const nodemailer = require("nodemailer");
const Stat = require("./model/statDetails.js");
const { userInfo } = require("os");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const server = require("http").createServer(app);
const socketIO= require("socket.io");
const io = socketIO(server, {cors: {origin: "*"}});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/games", gameRoutes);

app.use("/join-us", joinRoutes);

app.get("/contact-us", (req, res) => {
    res.render("Contact-Us",{
        loggedUser: req.session.loggedUser
    });
});

app.post("/sendMail", (req, res) => {
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "amalsn014916@gmail.com",
            pass: "amalsn123"
        }
    });
    var mailOptions = {
        from: "amalsn014916@gmail.com",
        to: "amalsn014916@gmail.com",
        subject: "Issue",
        text: "Message from: " + req.body.email +"\nIssue: " + req.body.message
    };
    transporter.sendMail(mailOptions, function(err, info){
        if(err)console.log(err);
        else console.log("sent");
        res.redirect("/contact-us");
    });
});

app.get("/statistics", (req,res) => {
    if(req.session.loggedUser == undefined){
        res.redirect("/join-us/login");
    }
    else{
        let played, wins, losses;
        new Promise((resolve) => {
            Stat.findOne({uName: req.session.loggedUser}, (err, docs) => {
                if(err)console.log(err);
                played = docs.played;
                wins = docs.wins;
                losses = docs.losses;
                resolve();
            });
        }).then(() => {
                res.render("Statistics",{
                    loggedUser: req.session.loggedUser,
                    played: played,
                    wins: wins,
                    losses: losses
                })
            }
        )  
    }
})

app.get("/", (req, res) => {
    if(req.session.loggedUser == undefined){
        res.redirect("/join-us/login");
    }
    else{
        res.render("Main-Page",{
            loggedUser: req.session.loggedUser
        });
    }
});

server.listen(3000, () => {
    console.log("Server is running...");
});

// io.on("connection", (socket) => {
    
//     let roomNum = 0;

//     socket.on("createRoom",(data)=>{
//         roomNum = data;
//         socket.join(roomNum);
//         console.log("User connected:", socket.id, "Room number:", roomNum);
//     });

//     socket.on("moveS", (data) => {
//         console.log(data);
//         socket.to(roomNum).emit("move", data);
//     });
// });

let peopleInRoom = {};

io.on("connection", (socket) => {

    let roomNum = 0;

    socket.on("createRoomT",(data)=>{
        roomNum = data;
        socket.join(roomNum);
        if(roomNum in peopleInRoom){
            peopleInRoom[roomNum]++;
        }
        else{
            peopleInRoom[roomNum] = 1;
        }
        if(peopleInRoom[roomNum] == 2){
            io.to(socket.id).emit("freezeScreenT");
        }
        console.log("User connected:", socket.id, "Room number:", roomNum, "No. in room:", peopleInRoom[roomNum]);
    })

    socket.on("moveT", (data) => {
        console.log(data);
        socket.to(roomNum).emit("moveT", data);
        io.to(socket.id).emit("freezeScreen");
    });
    
    socket.on("reloadT", () => {
        socket.to(roomNum).emit("reloadT");
    });

    socket.on("drawT", () => {
        socket.to(roomNum).emit("drawT");
    });

    socket.on("winT", function(data){
        new Promise((resolve) => {
            Stat.findOne({uName: String(data.y)},(err, doc) => {
                if(err)console.log(err);
                resolve(doc);
            });
        }).then(
            (doc) => {
                doc.wins[0]++;
                doc.played[0]++;
                doc.save();
            }
        ).then(() => {
            socket.to(roomNum).emit("winT", data);
            socket.disconnect(true);
            delete peopleInRoom[roomNum];
        });
    });

    socket.on("lossT", function(data){
        new Promise((resolve) => {
            Stat.findOne({uName: data},(err,doc) => {
                if(err)console.log(err);
                resolve(doc)
            });
        }).then(
            (doc) => {
                doc.losses[0]++;
                doc.played[0]++;
                doc.save();
                socket.disconnect(true);
                delete peopleInRoom[roomNum];
            }
        );
    });

    socket.on("createRoomS",(data)=>{
        roomNum = data;
        socket.join(roomNum)
        if(roomNum in peopleInRoom){
            peopleInRoom[roomNum]++;
        }
        else{
            peopleInRoom[roomNum] = 1;
        }
        if(peopleInRoom[roomNum] != 1){
            io.to(socket.id).emit("freezeScreenS");
        }
        io.to(socket.id).emit("turnOrder", peopleInRoom[roomNum]-1);
        console.log("User connected:", socket.id, "Room number:", roomNum, "No. in room:", peopleInRoom[roomNum]);
    });

    socket.on("moveS", (data) => {
        console.log(data);
        socket.to(roomNum).emit("moveS", data);
        io.to(socket.id).emit("freezeScreenS");
    });

    socket.on("winS", (data) => {
        new Promise((resolve) => {
            Stat.findOne({uName: String(data.y)},(err, doc) => {
                if(err)console.log(err);
                resolve(doc);
            });
        }).then(
            (doc) => {
                doc.wins[1]++;
                doc.played[1]++;
                doc.save();
            }
        ).then(() => {
            socket.to(roomNum).emit("winS", data);
        });
    })

    socket.on("lossS", (data) => {
        new Promise((resolve) => {
            Stat.findOne({uName: data},(err,doc) => {
                if(err)console.log(err);
                resolve(doc)
            });
        }).then(
            (doc) => {
                doc.losses[1]++;
                doc.played[1]++;
                doc.save();
            }
        );
    });

    socket.on("createRoomL",(data)=>{
        roomNum = data;
        socket.join(roomNum)
        if(roomNum in peopleInRoom){
            peopleInRoom[roomNum]++;
        }
        else{
            peopleInRoom[roomNum] = 1;
        }
        if(peopleInRoom[roomNum] != 1){
            io.to(socket.id).emit("freezeScreenL");
        }
        io.to(socket.id).emit("turnOrder", peopleInRoom[roomNum]-1);
        console.log("User connected:", socket.id, "Room number:", roomNum, "No. in room:", peopleInRoom[roomNum]);
    });

    socket.on("moveL", (data) => {
        socket.to(roomNum).emit("moveL", data);
        io.to(socket.id).emit("freezeScreenL");
    });
})