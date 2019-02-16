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
  if (user === 'hangtu' && pass === '1234') {
    res.json({ token: "1234" })
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
  var newvalues = { $set: { "data.deudas": req.body } };
  db.get().collection("debts").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
  res.json({ status: "ok" })
});

router.post('/updateContent', function (req, res, next) {
  var newvalue = req.body.newItem;
  var oldValue = req.body.oldItem;

  var query = { title: "deudas", "data.deudas.nombre": oldValue.nombre };
  var update = {
    $set: {
      "data.deudas.$.nombre": newvalue.nombre,
      "data.deudas.$.deuda": newvalue.deuda,
      "data.deudas.$.pagoMinimo": newvalue.pagoMinimo,
      "data.deudas.$.diaLimite": newvalue.diaLimite
    }
  };

   /*var update = { // replace all object
    $set: {
      "data.deudas.$": newvalue,
    }
  };*/

  db.get().collection("debts").updateOne(query, update, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
  res.json({ status: 'ok' })
});

router.post('/save', function (req, res, next) {
  var myquery = { title: "deudas" };
  var obj = {
    nombre: req.body.nombre,
    deuda: req.body.deuda,
    pagoMinimo: req.body.pago_min,
    diaLimite: req.body.limit_day,
    tipo: "deuda",
    pagado: "no"
  };
  var newvalues = {
    $push: {
      "data.deudas": obj
    }
  }
  db.get().collection('debts').updateOne(myquery, newvalues, function (err, resp) {
    if (err) throw err;
    console.log("1 document updated");
    res.json({ status: "ok", item: obj });
  });
});


router.post('/delete', function (req, res, next) {
  var query = { title: "deudas" };
  var removeValue = {
    $pull: {
      "data.deudas": {
        nombre: req.body.nombre
      }
    }
  }
  console.log(removeValue);
  db.get().collection('debts').updateOne(query, removeValue, function (err, resp) {
    if (err) throw err;
    console.log("1 document deleted");
    res.json({ status: "ok" });
  });
});

module.exports = router;
