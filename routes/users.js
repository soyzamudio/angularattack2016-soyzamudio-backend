var express = require('express');
var router = express.Router();

var User = require('./../models/user.js');

// define the home page route
router.get('/user', function(req, res) {
  User.findById({ _id: '5736bfb1da78cdee854a7239' }, function(err, user) {
    if (err) { res.status(404); }
    res.status(200).send({user: user});
  });
});

router.get('/user/:id', function(req, res) {
  User.find({_id: req.params.id}, function(err, user) {
    if (err) { res.status(404); }
    res.status(200).send({user: user});
  });
});

router.post('/user', function(req, res) {
  var user = new User(req.body);
  user.save(function(err) {
    if (err) { res.code(400) }
    res.status(200).send({user: user});
  });
});

module.exports = router;
