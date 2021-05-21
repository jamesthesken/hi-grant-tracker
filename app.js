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
const { GoogleSpreadsheet } = require('google-spreadsheet');

// -------------------------------------------------- //
// Variables
// -------------------------------------------------- //
const doc = new GoogleSpreadsheet('1rKR-JnBC41GsV4tkd8aDaX3pzH0J7NPyNNarOQjaXkk');

// -------------------------------------------------- //
// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
// -------------------------------------------------- //
(async function() {
  await doc.useServiceAccountAuth({
    client_email: config.client_email,
    private_key: config.private_key,
  });
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const rows = await sheet.getRows(); // can pass in { limit, offset }
}());

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

app.get('/data', async function(req, res) {
  await doc.useServiceAccountAuth({
    client_email: config.client_email,
    private_key: config.private_key,
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  // const result = [{
  //   "funder": rows[3].FUNDER,
  //   "amount": rows[3]['FUNDING INFO'],
  // }];
  const result = []
  for (i = 2; i < sheet.rowCount; i++) {
    if (typeof(rows[i]) !== "undefined"){  
      var a = {
        "funder": rows[i].FUNDER,
        "federal": rows[i]['FEDERAL?'],
        "title": rows[i]['PROGRAM TITLE/DESCRIPTION'],
        "eligibility": rows[i].ELIGIBILITY,
        "amount": rows[i]["FUNDING INFO"],
        "dueDate": rows[i]["DUE DATE*"]
      }
      result.push(a)
    }
  }

  res.send(result);
})


// -------------------------------------------------- //
// Create and start our server
// -------------------------------------------------- //
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});