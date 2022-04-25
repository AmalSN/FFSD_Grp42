const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const loggedUser = require("./join-us").loggedUser;
const socketFun = require("./../app.js");
const Stat = require("./../model/statDetails");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/tic-tac-toe", (req, res) => {
    if(req.session.loggedUser == undefined){
        res.redirect("/join-us/login");
    }
    res.render("TicTacToeRoomSelection",{
        loggedUser: req.session.loggedUser
    })
});

router.get("/tic-tac-toe-room", (req, res) => {
    if(req.session.loggedUser == undefined){
        res.redirect("/join-us/login");
    }
    else{
        res.render("TicTacToe",{
            loggedUser: req.session.loggedUser
        });
    }
});

router.get("/snake-ladder", (req, res) => {
    if(req.session.loggedUser == undefined){
        res.redirect("/join-us/login");
    }
    else{
        res.render("Snake-LadderRoomSelection",{
            loggedUser: req.session.loggedUser
        });
    }
});

router.get("/snake-ladder-room", (req, res) => {
    if(req.session.loggedUser == undefined){
        res.redirect("/join-us/login");
    }
    else{
        res.render("Snake-Ladder",{
            loggedUser: req.session.loggedUser
        });
    }
});

router.get("/ludo", (req, res) => {
    if(req.session.loggedUser == undefined){
        res.redirect("/join-us/login");
    }
    else{
        res.render("LudoRoomSelection",{
            loggedUser: req.session.loggedUser
        });
    }
});

router.get("/ludo-room", (req, res) => {
    if(req.session.loggedUser == undefined){
        res.redirect("/join-us/login");
    }
    else{
        res.render("Ludo",{
            loggedUser: req.session.loggedUser
        });
    }
});

module.exports = router;