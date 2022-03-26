const path = require("path");

const express = require("express");

const gameRoutes = require("./routes/games.js");
const joinRoutes = require("./routes/join-us.js");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/games", gameRoutes);

app.use("/join-us", joinRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "Main-Page.html"));
});

app.listen(3000);