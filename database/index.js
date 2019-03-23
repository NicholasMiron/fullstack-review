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

//Middleware preventing duplicates
repoSchema.path('id').validate(function(value, done) {
  this.model('Repo').count({ id: value }, function(err, count) {
      if (err) {
          return done(err);
      } 
      done(!count);
  });
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, cb) => {
  console.log('DB: In save (to db)');
  for (aRepo of repos) {
    let oneRepo = new Repo(aRepo);
    oneRepo.save(err => {
      if (err) {
        cb(err);
      } else {
        console.log('DB: success saved to db');
      }
    });
  }

  cb(null);
}

let pull = (cb) => {
  console.log('DB: in pull (from db)');
  Repo.find(null, null, {limit:25, sort:{watchers: -1}}).then(results => {
    cb(null, results);
  })
  .catch(err => {
    cb(err);
  })
}

module.exports.save = save;
module.exports.pull = pull;