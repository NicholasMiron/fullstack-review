const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const {getReposByUsername} = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json({urlencoded: true}));

app.post('/repos', function (req, res) {
  console.log('request received in repos', req.body);
  const username = req.body.username;

  if(username) {
    getReposByUsername(username, (err) => {
      if (err) {
        console.log('failed to got stuff');
      } else {
        console.log('Got Stuff')
        res.end();
      }
    });
  }
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

});

app.get('/repos', function (req, res) {
  db.pull((err, results) => {
    if (err) {
      console.log('failed to get data');
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

