const bodyParser = require('body-parser');
const {getReposByUsername} = require('../helpers/github.js');
const db = require('../database/index.js');
const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json({urlencoded: true}));

app.post('/repos', function (req, res) {
  console.log('Server: post request receieved to /repos');
  const username = req.body.username;

  if(username) {
    getReposByUsername(username, (err) => {
      if (err) {
        console.log('Server: failed getting and inserting all repos');
      } else {
        console.log('Server: Repos succesfully put into db')
        res.end();
      }
    });
  }
});

app.get('/repos', function (req, res) {
  console.log('Server: get request received to /repos')
  db.pull((err, results) => {
    if (err) {
      console.log('Server: failed to retrieve repos from db');
    } else {
      console.log('Server: Succes retriving repos from db');
      res.send(results);
    }
  });
});

const port = process.env.PORT || 1128;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

