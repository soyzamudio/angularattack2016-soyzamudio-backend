var express = require('express');
var router = express.Router();
var Post = require('./../models/post.js');
var User = require('./../models/user.js')

router.get('/posts/current', function(req, res) {
  Post.find({user: { _id: '5736bfb1da78cdee854a7239' }}, function(err, posts) {
    if (err) { res.status(404); }
    res.status(200).send({posts: posts});
  });
});

router.get('/posts', function(req, res) {
  Post.find({})
    .populate('user')
    .populate({path: 'comments', model: 'Comment', populate: { path: 'user', model: 'User' }})
    .exec(function(err, posts) {
      if (err) { res.code(404) }
      res.status(200).send({posts: posts});
    });
});

router.post('/posts', function(req, res) {
  User.findById({ _id: '5736bfb1da78cdee854a7239' }, function(err, user) {
    req.body.post.user = user._id;
    var post = new Post(req.body.post);

    post.save(function(err) {
      if (err) { res.status(400) }
      res.status(200).send({post: post});
    });
  })
});

module.exports = router;
