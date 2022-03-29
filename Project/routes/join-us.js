const path = require("path");
const url = require("url");

const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

const db_name = path.join(__dirname, "..", "data", "userDetails.db");
const db = new sqlite3.Database(db_name, e => {
    if (e) {
        return console.log(e.message);
    }
});

const createTable = `
    create table if not exists users(
    uName varchar(50) primary key,
    password varchar(50) not null,
    email varchar(50) not null,
    fName varchar(50) not null,
    lName varchar(50) not null,
    age integer,
    gender varchar(6)
);`;

db.run(createTable, e => {
    if(e){
        return console.error(e.message);
    }
});

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/login", (req, res) => {
    res.render("Login-Page.ejs", {
        usernameCheck: Number(req.query.unCheck),
    });
});

router.post("/login", (req, res) => {
    
    const checkElementExists = `
    select uName from users;
    `;
    const insertElement = `
    insert into users values
    ("${req.body.uName}","${req.body.password}","${req.body.email}","${req.body.fName}",
        "${req.body.lName}",${Number(req.body.age)},"${req.body.gender}");
    `;
    
    let promise = new Promise((resolve, reject) => {
        db.all(checkElementExists, [], (e, rows) => {
            if(e)console.error(e.message);
            let checkFlag = 0
            rows.forEach(row => {
                    if(row.uName == req.body.uName){
                        checkFlag = 1;
                    }
            });
            if(!checkFlag)resolve(req.body.uName);
            else reject(req.body.uName);
        });
    });

    promise.then(
        (x) => {
            db.run(insertElement, e => {
                if(e){
                    return console.error(e.message);
                }
                console.log(x, "inserted");
                res.render("Login-Page.ejs", {
                    usernameCheck: Number(req.query.unCheck),
                });
            });
        },
        (x) => {
            console.log(x, "already exists");
            res.redirect("/join-us/signup?unCheck=1&un="+x);
        }
    );

});

router.get("/signup", (req, res) => {
    res.render("Signup-Page.ejs", {
        usernameCheck: Number(req.query.unCheck),
        username: req.query.un
    });
});

router.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "User-Info.html"));
});

router.post("/loginCheck", (req, res) => {
    const checkElementExists = `
    select uName,password from users;
    `;
    
    let promise = new Promise((resolve, reject) => {
        db.all(checkElementExists, [], (e, rows) => {
            if(e)console.error(e.message);
            let checkFlag = 0;
            rows.forEach(row => {
                    if(row.uName == req.body.uName){
                        if(row.password == req.body.password)checkFlag = 1;
                    }
            });
            if(checkFlag)resolve();
            else reject();
        });
    });
    promise.then(
        () => {
            res.redirect("/");
        },
        () => {
            res.redirect("/join-us/login?unCheck=1");
        }
    );
});

module.exports = router;