// Hawaii Non-Profit Grant Tracker
// (c) 2021 James Thesken
// james@kauaitechgroup.com
// This code is licensed under MIT license

// -------------------------------------------------- //
// Module Dependencies
// -------------------------------------------------- //
var express = require('express');
var http = require('http');
var config = require('./config.js');              // Get our config info (app id and app secret)
var app = express();

// -------------------------------------------------- //
// Express set-up and middleware
// -------------------------------------------------- //
app.set('port', (process.env.PORT || config.PORT));
app.use(express.static(__dirname + '/public'));

// -------------------------------------------------- //
// Routes
// -------------------------------------------------- //

app.get('/', function(req, res) {
  console.log("got heres");
  res.redirect('/index.html');
});

// -------------------------------------------------- //
// Create and start our server
// -------------------------------------------------- //
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});