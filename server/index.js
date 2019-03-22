const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const {getReposByUsername} = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json({urlencoded: true}));

app.post('/repos', function (req, res) {
  console.log('request received in repos', req.body);
  const username = req.body.username;

  if(username) {
    getReposByUsername(username);
  }
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  res.sendStatus(201);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

