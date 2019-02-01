var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var db = require('../db')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Server is running' });
});

router.post('/login', function (req, res) {
   user = req.body.user;
   pass = req.body.password;
   if(user === 'hangtu' && pass === '1234'){
    res.json({token:"1234"})
   }

   res.send(401)  
});

router.get('/get', function (req, res, next) {
  var collection = db.get().collection('debts');
  collection.find(myquery).toArray(function (err, data) {
    res.send(JSON.stringify(data));
  });
});

router.get('/findOne', function (req, res, next) {
  var collection = db.get().collection('debts');
  var myquery = { title: "deudas" };
  collection.find(myquery).toArray(function (err, data) {
    res.send(JSON.stringify(data));
  });
});

router.post('/update', function (req, res, next) {
  var myquery = { title: "deudas" };
  var newvalues =  { $set: { "data.deudas" : req.body }};
   db.get().collection("debts").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

  res.json({status:"ok"})

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
