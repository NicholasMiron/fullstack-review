const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: 'string',
  full_name: 'string',
  id: 'number',
  html_url: 'string',
  watchers: 'number'
});

repoSchema.index({ pkey: 1 }, { unique: true });

repoSchema.path('id').validate(function(value, done) {
  this.model('Repo').count({ id: value }, function(err, count) {
      if (err) {
          return done(err);
      } 
      done(!count);
  });
}, 'repo already exists');

let Repo = mongoose.model('Repo', repoSchema);



let save = (repos, cb) => {
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

  cb(null);
}

let pull = (cb) => {
  console.log('made it to pull');
  Repo.find(null, null, {limit:25, sort:{watchers: -1}}).then(results => {
    cb(null, results);
  })
  .catch(err => {
    cb(err);
  })
}

module.exports.save = save;
module.exports.pull = pull;