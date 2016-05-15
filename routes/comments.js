var express = require('express');
var router = express.Router();
var Post = require('./../models/post.js');
var User = require('./../models/user.js');
var Comment = require('./../models/comment.js');


router.post('/comments/:id', function(req, res) {
  Post.findById({ _id: req.params.id }, function(err, post) {
    var comment = new Comment(req.body.comment);
    post.comments.push(comment._id);

    comment.save(function(error) {
      post.save(function(err) {
        if (err) { res.status(400) }
        res.status(200).send({ post: post });
      });
    });
  });
});

module.exports = router;
