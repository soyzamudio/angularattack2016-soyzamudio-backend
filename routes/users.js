var express = require('express');
var router = express.Router();

var User = require('./../models/user.js');

router.get('/user/:id', function(req, res) {
  User.find({_id: req.params.id}, function(err, user) {
    if (err) { res.status(404); }
    res.status(200).send({user: user});
  });
});

router.post('/user/login', function(req, res) {
  req.body.user.username = req.body.user.username.toLowerCase();
  req.body.user.password = req.body.user.password.toLowerCase();
  User.find({username: req.body.user.username}, function(err, user) {
    if (user.length === 0) { res.status(404).send( { message: 'User not found' }); }
    if (err) { res.status(500).send({message: 'Something went wrong, trye again...'}); }
    if (user.length > 0 && user[0].password === req.body.user.password) {
      res.status(200).send({user: user});
    } else {
      res.status(404).send({ message: 'Incorrect username or password' });
    }
  });
});

router.post('/user/signup', function(req, res) {
  req.body.user.username = req.body.user.username.toLowerCase();
  req.body.user.password = req.body.user.password.toLowerCase();
  var user = new User(req.body.user);
  user.save(function(err) {
    if (err) { res.code(500); }
    user.password = '';
    res.status(200).send({user: user});
  });
});

module.exports = router;
