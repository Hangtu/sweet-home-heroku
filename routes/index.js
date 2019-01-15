var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var db = require('../db')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Hi Hang Tu' });
});


router.get('/getAll', function (req, res, next) {
  var collection = db.get().collection('debts');
  collection.find().toArray(function (err, data) {
    res.send(JSON.stringify(data));
  });
});

/*router.get('/getAll', function (req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) throw err
    var db = client.db(dbName)
    db.collection('debts').find().toArray(function (err, data) {
      if (err) throw err
      res.send(JSON.stringify(data));
    })
  })
});*/

module.exports = router;
