var express = require('express');
var router = express.Router();
var Post = require('./../models/post.js');
var User = require('./../models/user.js')

router.get('/posts/:id', function(req, res) {
  Post.find({user: { _id: req.params.id }})
    .populate('user')
    .populate({path: 'comments', model: 'Comment', populate: { path: 'user', model: 'User' }})
    .exec(function(err, posts) {
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
  var post = new Post(req.body.post);

  post.save(function(err) {
    if (err) { res.status(500) }
    res.status(200).send({post: post});
  });
});

module.exports = router;
