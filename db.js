var MongoClient = require('mongodb').MongoClient
const dbName = "sweet-home";
const url = "mongodb://root:12345Ha.@ds257054.mlab.com:57054/sweet-home";

var state = {
  db: null,
}

exports.connect = function(done) {
  if (state.db) return done()

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) return done(err)
    state.db = db.db(dbName)
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}