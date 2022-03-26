const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "Login-Page.html"));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "Signup-Page.html"));
})

module.exports = router;