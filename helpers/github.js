const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username, cb) => {
  console.log('In getReposByUsernmae', username);
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      console.log('err', err);
      cb(err);
    } else {
      // console.log('body', body);
      console.log('Got data back');
      db.save(JSON.parse(body), (err) => {
        if (err) {
          console.log('Failed to save into db');
          cb(err)
        } else {
          cb(null, 'success');
        }
      });
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;