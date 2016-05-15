var express = require('express');
var router = express.Router();
var Post = require('./../models/post.js');

// define the home page route
router.get('/posts', function(req, res) {
  Post.find({}).populate(['user']).exec(function(err, posts) {
    if (err) { res.code(404) }
    res.status(200).send({posts: posts});
  });
});

router.post('/likes/:id', function(req, res) {
  Post.findById({ _id: req.params.id }, function(err, post) {
    post.favs++;
    post.save(function(err) {
      if (err) { res.status(500) }
      res.status(200).send({ post: post });
    });
  });
});

router.post('/unlikes/:id', function(req, res) {
  Post.findById({ _id: req.params.id }, function(err, post) {
    post.favs--;
    post.save(function(err) {
      if (err) { res.status(500) }
      res.status(200).send({ post: post });
    });
  });
});

module.exports = router;
