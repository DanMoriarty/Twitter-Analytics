'use strict';

//----------------------------   CONTROLLERS   ----------------------------//

// CouchDB docs for specifying view options:
// 		http://docs.couchdb.org/en/2.0.0/api/ddoc/views.html#view-options

// Initialise connection to CouchDB database
var nano		= require('nano')('http://115.146.93.56:8888/'),
	db_name 	= 'melbtweets2',
	test_db_name = 'melbtweets_sentiment',
	db 			= nano.use(db_name),
	design		= 'viewsfile',
	speeddesign = 'speed',
	sadesign	= 'sa2'
	;

exports.getMelbTweets = function(req, res) {
	db.view(design, 'melb', {stale: "ok"}, function(err, body) {
		// body.rows.forEach(function(doc) {
		// 	console.log(doc)
		// });
		res.send(body);
	});
}

// get tweets in the view and specify key(s)
exports.getMelbTweetsKey = function(req, res) {
	db.view(design, 'melb', {stale: "ok", key: req.key, include_docs: true}, function(err, body) {
		res.send(body);
	});
}

exports.getSpeed = function(req, res) {
	db.view(speeddesign, 'all-over-1kph', function(err, body) {
		res.send(body);
		console.log(err);
	});
}

exports.getSpeedStale = function(req, res) {
	db.view(speeddesign, 'all-over-1kph', {stale: "ok"}, function(err, body) {
		res.send(body);
		console.log(err);
	});
}


// get view containing number of tweets by each user
exports.getUserTweets = function(req, res) {
	db.view(design, 'all-tweets-by-user', { stale: "ok", group_level: 1 }, function(err, body) {
		res.send(body);
	});
}

// get view containing number of tweets and filter by user
exports.getUserTweetsKey = function(req, res) {
	db.view(design, 'all-tweets-by-user', { group: true, 'keys': req.key }, function(err, body) {
		res.send(body);
	});
}

exports.getSuburbSentiment = function(req, res) {
	db.view(sadesign, 'sa2-sentiment', { stale: "ok", group_level: 1 }, function(err, body) {
		res.send(body);
	});
}

exports.getSuburbSentimentTime = function(req, res) {
	db.view(sadesign, 'sa2-timeofday', { stale: "ok", group_level: 1 }, function(err, body) {
		res.send(body);
	});
}

exports.getSentimentTime = function(req, res) {
	db.view(sadesign, 'sa2-timeofday', { stale: "ok", group_level: 0 }, function(err, body) {
		res.send(body);
	});
}

//------------------------------  END  FILE  ------------------------------//