var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pawn_guild')
   .then(() => console.log('connection to DB succesful.'))
   .catch((error) => console.error(err));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./models/Application');
require('./models/Comment');

var applications = require('./routes/applications');
app.use('/applications', applications);
var apply = require('./routes/apply');
app.use('/apply', apply);

app.get("/index.html", (req, res) => res.sendFile(__dirname + "/" + "index.html"));

var server = app.listen(80, () => console.log("Server running."));