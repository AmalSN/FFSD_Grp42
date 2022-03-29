const path = require("path");

const express = require("express");

const gameRoutes = require("./routes/games.js");
const joinRoutes = require("./routes/join-us.js");
const leaderboardRoutes = require("./routes/leaderboard.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use("/games", gameRoutes);

app.use("/join-us", joinRoutes);

app.use("/leaderboard", leaderboardRoutes);

app.get("/contact-us", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "Contact-Us.html"));
});

app.get("/statistics", (req,res) => {
    res.sendFile(path.join(__dirname, "views", "Statistics.html"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "Main-Page.html"));
});

app.listen(3000);