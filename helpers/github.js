const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username, cb) => {
  console.log('Helper: making request to github');

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      console.log('Helper: request to github failed');
      cb(err);
    } else {
      console.log('Helper: success getting repos from github');
      db.save(JSON.parse(body), (err) => {
        if (err) {
          console.log('Helper: Failed to save into db');
          cb(err)
        } else {
          cb(null);
        }
      });
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;