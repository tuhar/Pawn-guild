var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static('public'));


app.get("/index.html", (req, res) => res.sendFile(__dirname + "/" + "index.html"));

var server = app.listen(80, () => console.log("Server running."));