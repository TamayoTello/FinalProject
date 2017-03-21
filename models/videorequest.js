var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var videoRequest = new Schema({
    reqVideoTitle: {
    	type: String,
    	required: true
    },
    reqVideoDetails: {
    	type: String,
    	required: true
    },
    reqVideoCategory: {
    	type: String,
    	required: true
    },
    reqVideoEmbed: {
    	type: String,
    	required: true
    },
    reqVideoDate: String,
    videoUpdateDate: String,

},
{
    collection: 'requests'
});

module.exports = mongoose.model('Request', videoRequest);