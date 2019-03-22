const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: 'string',
  full_name: {type:'string', unique: true},
  id: 'number',
  html_url: 'string'
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // Data comes back as an array
  // For looop??
  console.log('made it to save');
  for (aRepo of repos) {
    let oneRepo = new Repo(aRepo);
    oneRepo.save(err => {
      if (err) {
        cb(err);
      } else {
        console.log('Saved to db');
      }
    });
  }

  // Repo.insertMany(repos);
  cb(null);
}

module.exports.save = save;