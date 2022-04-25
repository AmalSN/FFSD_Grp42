const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/tic-tac-toe", (req, res) => {
    res.render("TicTacToe-Leaderboard");
});

router.get("/snake-ladder", (req, res) => {
    res.render("Snake-Ladder-Leaderboard");
});

router.get("/ludo", (req, res) => {
    res.render("Ludo-Leaderboard");
});

module.exports = router;