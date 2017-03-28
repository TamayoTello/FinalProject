var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

var Request = require('../models/videorequest');
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
  Request.find(function(err, requests){
    res.render('videorequestlist', {
        requests: requests,
        user: req.user
      });
  })
});
  router.post('/', function(req,res){
    res.redirect('/requests')
  })

//Adding New Request
router.get('/new', function(req, res) {
  console.log();
  var data = {
    status: addStatus,
    user: req.user
  }
  res.render('videorequest', data);
  addStatus = "";
});

//POST Method when submitting new Request
router.post('/new', function(req, res) {
  var dataToSave = {
    reqUsername: req.body.reqUsername,
    reqVideoTitle: req.body.reqVideoTitle,
    reqVideoEmbed: req.body.reqVideoEmbed,
    reqVideoDetails: req.body.reqVideoDetails,
    reqVideoCategory: req.body.reqVideoCategory,
    reqVideoDate: getDate,
  };

  var data = new Request(dataToSave)
  data.save(function(err, requests){
    if(err) {
      console.log('Saving Data Failed!');
      addStatus = 'Sending Request Failed';
    }
    else {
      console.log('Saving Data Successful!');
      addStatus = 'Your Request Has Been Recorded';
      res.redirect('/requests/new');
    }
  });
});

//Page of each Request
router.get('/:requestId', function(req, res) {
  var requestId = req.params.requestId;
  Request.findById(requestId, function(err, info){
    res.render('videorequestdetails', {
      requestInfo: info,
      user: req.user
    });
  }); 
});

//Edit Page
router.get('/:requestId/edit', function(req, res) {
  var requestId = req.params.requestId;

  Request.findById(requestId, function(err, info) {
    res.render('videorequest_update', {
        requestInfo: info,
        user: req.user
    })
  })
});

//POST Method when updating an Request
router.post('/:requestId', function(req, res){
  var requestId = req.params.requestId;

  var newData = {
    videoTitle: req.body.videoTitle,
    videoEmbed: req.body.videoEmbed,
    videoDetails: req.body.videoDetails,
    videoCategory: req.body.videoCategory,
    videoUpdateDate: getDate,
  }

  Request.update({_id: requestId}, {$set: newData}, function(err, result) {
    
    if(err) {
      console.log("Item not updated!");
    }
    else {
      console.log("Item Updated!")
      res.redirect('/requests/' + requestId)
    }
  }); 
});

//Delete Request
router.get('/:requestId/delete', function(req, res){
  var requestId = req.params.requestId;
  Request.findByIdAndRemove(requestId).exec();
  res.redirect('/requests')
})

module.exports = router;
