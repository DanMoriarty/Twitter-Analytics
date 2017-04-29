'use strict';

//----------------------------   CONTROLLERS   ----------------------------//

// Initialise connection to CouchDB database
var nano		= require('nano')('http://115.146.93.56:8888/'),
	db_name 	= 'melbtweets_sentiment',
	db 			= nano.use(db_name),
	design		= 'viewsfile'
	;

exports.getMelbTweets = function(req, res) {
	db.view(design, 'melb', function(err, body) {
		// body.rows.forEach(function(doc) {
		// 	console.log(doc)
		// });
		res.send(body);
	});
}

// get tweets in the view and specify key(s)
exports.getMelbTweetsKey = function(req, res) {
	db.view(design, 'melb', {key: req.key, include_docs: true}, function(err, body) {
		res.send(body);
	});
}

// get view containing number of tweets by each user
exports.getUserTweets = function(req, res) {
	db.view(design, 'all-tweets-by-user', { group_level: 1 }, function(err, body) {
		res.send(body);
	});
}

// get view containing number of tweets and filter by user
exports.getUserTweetsKey = function(req, res) {
	db.view(design, 'all-tweets-by-user', {group: true, 'keys': req.key}, function(err, body) {
		res.send(body);
	});
}

//------------------------------  END  FILE  ------------------------------//