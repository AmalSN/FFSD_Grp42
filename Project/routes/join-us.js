const path = require("path");
const url = require("url");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../model/userDetails.js");
const Stat = require("../model/statDetails.js");
const { resolve } = require("path");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

const connectionString = "mongodb+srv://amalsn:amal123@ffsd42.qhbl5.mongodb.net/Proj42?retryWrites=true&w=majority";

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if(err)console.log(err);
    console.log("connected");
});

router.get("/login", (req, res) => {
    res.render("Login-Page.ejs", {
        usernameCheck: Number(req.query.unCheck),
        loggedUser: req.session.loggedUser
    });
});

router.post("/login", (req, res) => {

    new Promise((resolve, reject) => {
        User.findOne({uName: req.body.uName},(err, docs) => {
            if(err)console.log(err);
            else if(docs == null){
                resolve();
            }
            else reject();
        });
    }).then(() => {
        let newUser = new User({
            uName: req.body.uName,
            password: req.body.password,
            email: req.body.email,
            fName: req.body.fName,
            lName: req.body.lName,
            age: Number(req.body.age),
            gender: req.body.gender
        });
        let newStat = new Stat({
            uName: req.body.uName,
            played: [0,0,0],
            wins: [0,0,0],
            losses: [0,0,0]
        });
        console.log((newUser));
        newUser.save();
        newStat.save();
        res.redirect("/join-us/login");
    },
    () => {
            res.redirect(`/join-us/signup?unCheck=1&un=${req.body.uName}`);
    });
});

router.get("/signup", (req, res) => {
    res.render("Signup-Page.ejs", {
        usernameCheck: Number(req.query.unCheck),
        username: req.query.un,
        loggedUser: req.session.loggedUser
    });
});

router.get("/userValidation", (req, res) => {
    new Promise((resolve) => {
        User.findOne({uName: req.body.uName}, (err, docs) => {
            if(err)return console.log(err);
            resolve(docs);
        })
    }).then(
        (doc) => {
            if(doc.password == req.body.password){
                if(req.body.fName.length!=0) doc.fName = req.body.fName;
                if(req.body.lName.length!=0) doc.lName = req.body.lName;
                if(req.body.email.length!=0) doc.email = req.body.email;
                if(req.body.password.length!=0 && req.body.confirmPassword) doc.password = req.body.password;
                doc.save();
                res.redirect("/join-us/user?")
            }
            else{
                res.redirect("/join-us/user?check=1");
            }
        }
    );
});

router.get("/user", (req, res) => {
    res.render("User-Info",{
        loggedUser: req.session.loggedUser
    });
});

router.post("/loginCheck", (req, res) => {

    new Promise((resolve, reject) => {
        User.findOne({uName: req.body.uName, password: req.body.password}, (err, docs) => {
            if(err)console.log(err);
            else if(docs == null){
                reject();
            }
            else resolve();
        });
    }).then(
        () => {
            req.session.loggedUser = req.body.uName;
            res.redirect("/");
        },
        () => res.redirect("/join-us/login?unCheck=1")
    );

});

router.get("/logout", (req, res) => {
    req.session.loggedUser = undefined;
    res.redirect("/");
})

module.exports= router;