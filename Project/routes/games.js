const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/tic-tac-toe", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "TicTacToe.html"));
});

module.exports = router;