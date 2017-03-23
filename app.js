var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var flash = require('connect-flash');

const methodOverride = require('method-override');
const restify = require('express-restify-mongoose');
const router = express.Router();


var mdbUrl = "mongodb://admin:admin@ds161018.mlab.com:61018/coen3463t-t1";
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
mongoose.connect(mdbUrl, options, function(err, res) {
    if (err) {
        console.log('Error connecting to ' + mdbUrl);
    } else {
        console.log('ED-STREAMING Database Connected!');
    }
});
var db = mongoose.connection;

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var videos = require('./routes/videos');
var requests = require('./routes/requests');
var comments = require('./routes/comments');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/users');
var Comment = require('./models/comments');




app.use(flash());

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

var entry = require('./models/entry');

restify.serve(router, entry);
app.use(router);


app.use('/', index);
app.use('/auth', auth);
app.use('/videos', videos);
app.use('/requests', requests);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  	// set locals, only providing error in development
  	res.locals.message = err.message;
  	res.locals.error = req.app.get('env') === 'development' ? err : {};

  	// render the error page
  	res.status(err.status || 500);
  	res.render('error');
});

module.exports = app;
