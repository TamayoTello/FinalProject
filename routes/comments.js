var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

var Entry = require('../models/entry');
var Comment = require('../models/comments');
var date = new Date();
var getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

var mdbUrl = "mongodb://admin:admin@ds161018.mlab.com:61018/coen3463t-t1";

var addStatus;

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

//List all the entries
  router.get('/', function(req, res){
  Comment.find(function(err, comments){
    res.render('videodetails', {
        comments: comments,
        user: req.user
      });
  })
});
  router.post('/', function(req,res){
    res.redirect('/videos/' + videoId)
  })


//Adding New Entry
router.get('/new', function(req, res) {
  console.log();
  var data = {
    status: addStatus,
    user: req.user
  }
  res.render('videodetails', data);
  addStatus = "";
});

//POST Method when submitting new Entry
router.post('/new', function(req, res) {
  var dataToSave = {
    idComment: req.body.idComment,
    userComment: req.body.userComment,
    videoComment: req.body.videoComment,
    commentDate: getDate,
  };

  var data = new Comment(dataToSave)
  data.save(function(err, comments){
    if(err) {
      console.log('Saving Data Failed!');
      addStatus = 'Saving Data Failed!';
    }
    else {
      console.log('Saving Data Successful!');
      addStatus = 'Saving Data Success';
      res.redirect('/videos/:videoId');
    }
    });
  });


//Page of each Entry
router.get('/:commentId', function(req, res) {
  var commentId = req.params.commentId;
  Comment.findById(commentId, function(err, info){
    res.render('videodetails', {
      commentInfo: info,
      user: req.user
    });
  }); 
});

//Edit Page
router.get('/:commentId/edit', function(req, res) {
  var commentId = req.params.commentId;

  Comment.findById(commentId, function(err, info) {
    res.render('video_update', {
        commentInfo: info,
        user: req.user
    })
  })
});

//POST Method when updating an entry
router.post('/:commentId', function(req, res){
  var commentId = req.params.commentId;

  var newData = {
    videoComment: req.body.videoComment,
    commentDate: getDate,
  }

  Comment.update({_id: commentId}, {$set: newData}, function(err, result) {
    
    if(err) {
      console.log("Item not updated!");
    }
    else {
      console.log("Item Updated!")
      res.redirect('/videos/' + commentId)
    }
  }); 
});

//Delete Entry
router.get('/:commentId/delete', function(req, res){
  var commentId = req.params.commentId;
  Comment.findByIdAndRemove(commentId).exec();
  res.redirect('/videos')
})

module.exports = router;
