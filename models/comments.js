var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var videoCommentSchema = new Schema({
    idComment: {
        type: String,
        required: true
    },
    userComment: {
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

module.exports = mongoose.model('Comment', videoCommentSchema);