const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/tic-tac-toe", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "TicTacToe-Leaderboard.html"));
});

router.get("/snake-ladder", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "Snake-Ladder-Leaderboard.html"));
});

router.get("/ludo", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "Ludo-Leaderboard.html"));
});

module.exports = router;