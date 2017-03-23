var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var videoComment = new Schema({
    videoId: {
    	type: String,
    	required: true
    },
    commentUser: {
    	type: String,
    	required: true
    },
    videoComment: {
    	type: String,
    	required: true
    },
    commentDate: String,

},
{
    collection: 'comments'
});

module.exports = mongoose.model('Comment', videoComment);