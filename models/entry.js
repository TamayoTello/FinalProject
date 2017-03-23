var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var entrySchema = new Schema({
    videoTitle: {
    	type: String,
    	required: true
    },
    videoDetails: {
    	type: String,
    	required: true
    },
    videoCategory: {
    	type: String,
    	required: true
    },
    videoEmbed: {
    	type: String,
    	required: true
    },
    videoDate: String,
    videoUpdateDate: String,

},
{
    collection: 'videos'
});

module.exports = mongoose.model('Entry', entrySchema);