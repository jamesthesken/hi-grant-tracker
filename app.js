// Hawaii Non-Profit Grant Tracker
// (c) 2021 James Thesken
// james@kauaitechgroup.com
// This code is licensed under MIT license

// -------------------------------------------------- //
// Module Dependencies
// -------------------------------------------------- //
require('dotenv').config()
var express = require('express');
var http = require('http');
var config = require('./config.js');              // Get our config info (app id and app secret)
var app = express();
const { GoogleSpreadsheet } = require('google-spreadsheet');

// -------------------------------------------------- //
// Variables
// -------------------------------------------------- //
const doc = new GoogleSpreadsheet('13cpPI2-ZbmFUqImPXWul49Nnl_UbOzQWpCSC5MccS4Q');

// -------------------------------------------------- //
// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
// -------------------------------------------------- //
(async function() {
  await doc.useServiceAccountAuth({
    client_email: process.env.client_email,
    private_key: process.env.private_key.replace(/\\n/g, '\n'),
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
  console.log("got here");
  res.redirect('/index.html');
});

app.get('/data', async function(req, res) {
  await doc.useServiceAccountAuth({
    client_email: process.env.client_email,
    private_key: process.env.private_key.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const rows = await sheet.getRows(); // can pass in { limit, offset }

  const result = []
  for (i = 0; i < sheet.rowCount; i++) {
    if (typeof(rows[i]) !== "undefined"){
      const a = {
        "lastUpdated": rows[i]["Timestamp"],
        "funder": rows[i]['Funder'],
        "federal": rows[i]['Federal Opportunity'],
        "title": rows[i]['Program Title'],
        "description": rows[i]['Program Description'],
        "eligibility": rows[i]['Eligibility'],
        "programFunding": rows[i]["Funding Total"],
        "minAward": rows[i]["Minimum Award"],
        "maxAward": rows[i]['Maximum Award'],
        "dueDate": rows[i]["Due Date"],
        "dueDateOther": rows[i]["Due Date (Other)"],
        "url": rows[i]["Link"]
      }
      const today = new Date();
      if (new Date(rows[i]["Due Date"]) < today){
        a["isClosed"] = "Closed"
      } else if (new Date(rows[i]["Due Date"]) > today){
        a["isClosed"] = "Open"
      } else if (rows[i]["Due Date"] === ""){
        a["isClosed"] = rows[i]["Due Date Type"]
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
