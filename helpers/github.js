const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
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
    } else {
      // console.log('res', res);
      console.log('body', body);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;