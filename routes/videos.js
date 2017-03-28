var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

var Entry = require('../models/entry');
var Comment = require('../models/videocomments');
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
  Entry.find(function(err, videos){
    res.render('videolist', {
        videos: videos,
        user: req.user
      });
  })
});
  router.post('/', function(req,res){
    res.redirect('/videos')
  })

//List of Science Video
router.get('/Science', function(req, res){
  Entry.find(function(err, videos){
    res.render('videosscience', {
        videos: videos,
        user: req.user
      });
  })
});
  router.post('/Science', function(req,res){
    res.redirect('/videos')
  })

//List of Math Video
router.get('/Math', function(req, res){
  Entry.find(function(err, videos){
    res.render('videosmath', {
        videos: videos,
        user: req.user
      });
  })
});
  router.post('/Math', function(req,res){
    res.redirect('/videos')
  })

//List of English Videos
router.get('/English', function(req, res){
  Entry.find(function(err, videos){
    res.render('videosenglish', {
        videos: videos,
        user: req.user
      });
  })
});
  router.post('/English', function(req,res){
    res.redirect('/videos')
  })

//List of AP Videos
router.get('/AralingPanlipunan', function(req, res){
  Entry.find(function(err, videos){
    res.render('videosap', {
        videos: videos,
        user: req.user
      });
  })
});
  router.post('/AralingPanlipunan', function(req,res){
    res.redirect('/videos')
  })

//List of Filipino Videos
router.get('/Filipino', function(req, res){
  Entry.find(function(err, videos){
    res.render('videosfilipino', {
        videos: videos,
        user: req.user
      });
  })
});
  router.post('/Filipino', function(req,res){
    res.redirect('/videos')
  })

//List of MAPEH Videos
router.get('/Mapeh', function(req, res){
  Entry.find(function(err, videos){
    res.render('videosmapeh', {
        videos: videos,
        user: req.user
      });
  })
});
  router.post('/Mapeh', function(req,res){
    res.redirect('/videos')
  })

//List of Values Videos
router.get('/Values', function(req, res){
  Entry.find(function(err, videos){
    res.render('videosvalues', {
        videos: videos,
        user: req.user
      });
  })
});
  router.post('/Values', function(req,res){
    res.redirect('/videos')
  })

//Adding New Entry
router.get('/new', function(req, res) {
  console.log();
  var data = {
    status: addStatus,
    user: req.user
  }
  res.render('addvideo', data);
  addStatus = "";
});

//POST Method when submitting new Entry
router.post('/new', function(req, res) {
  var dataToSave = {
    videoTitle: req.body.videoTitle,
    videoEmbed: req.body.videoEmbed,
    videoDetails: req.body.videoDetails,
    videoCategory: req.body.videoCategory,
    videoDate: getDate,
  };

  var data = new Entry(dataToSave)
  data.save(function(err, videos){
    if(err) {
      console.log('Saving Data Failed!');
      addStatus = 'Saving Data Failed!';
    }
    else {
      console.log('Saving Data Successful!');
      addStatus = 'Video Item Has Been Recorded';
      res.redirect('/videos/new');
    }
  });
});


//Page of each Entry
router.get('/:videoId', function(req, res) {
  var videoId = req.params.videoId;
  var videoEntry;
  var commentVideo;

  Entry.findById(videoId, function(err, info){
    if (err) throw err;

    videoEntry = info;

  Comment.find(function(err, comments){
    res.render('videodetails', {
    comments: comments,
    videoInfo: videoEntry,
    user: req.user
    });
  })
});
});  

//Edit Page
router.get('/:videoId/edit', function(req, res) {
  var videoId = req.params.videoId;

  Entry.findById(videoId, function(err, info) {
    res.render('video_update', {
        videoInfo: info,
        user: req.user
    })
  })
});

//POST Method when updating an entry
router.post('/:videoId', function(req, res){
  var videoId = req.params.videoId;

  var newData = {
    videoTitle: req.body.videoTitle,
    videoEmbed: req.body.videoEmbed,
    videoDetails: req.body.videoDetails,
    videoCategory: req.body.videoCategory,
    videoUpdateDate: req.body.videoUpdateDate,
  }

  Entry.update({_id: videoId}, {$set: newData}, function(err, result) {
    
    if(err) {
      console.log("Item not updated!");
    }
    else {
      console.log("Item Updated!")
      res.redirect('/videos/' + videoId)
    }
  }); 
});

//Delete Entry
router.get('/:videoId/delete', function(req, res){
  var videoId = req.params.videoId;
  Entry.findByIdAndRemove(videoId).exec();
  res.redirect('/videos')
})

module.exports = router;
