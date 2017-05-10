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

var PythonShell = require('python-shell'),
	pyshell 	= new PythonShell('../Sentiment\ Analysis/langModel.py'),
	resBuffer 	= {},
	SEP 		= "^^^&$&$&^^^"
	;

// Event listener
pyshell.on('message', function(m) {
	// resBuffer.shift().send(m);
	let mjson = JSON.parse(m);

	// Check the unique key is still in the buffer
	if (resBuffer.hasOwnProperty(mjson.key)) {

		// Respond to the res with the Python output
		resBuffer[mjson.key].send(mjson.res);

		// Remove key from buffer
		delete resBuffer[mjson.key];
	}
})

exports.runLanguageModel = function(req, res) {
	// Make a unique key for this request
	let key = req.tweet + SEP + new Date().getTime()

	// add the key to the buffer
	resBuffer[key] = res; 

	// Send the key to python
	pyshell.send(key);
}


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

exports.getDeviceSentiment = function(req, res) {
	db.view('sources', 'tweet-specific-sources-with-sentiment', { stale: "ok", group_level: 2 }, function(err, body) {
		res.send(body);
	});
}

exports.getSpeed3k = function(req, res) {
	db.view(speeddesign, 'both-in-melb-between-over-3ph', {stale: "ok",group_level: 0,reduce:false}, function(err, body) {
		res.send(body);
	});
}

exports.getSpeed3k150k3m = function(req, res) {
	db.view(speeddesign, 'both-in-melb-between-3-and-150kph-within-3-mins', {stale: "ok"}, function(err, body) {
		res.send(body);
	});
}


exports.getUserLocations = function(req, res) {
	db.view(speeddesign, 'userspeed', {stale: "ok"}, function(err, body) {
		res.send(body);
	});
}

exports.getUserLocationsKey = function(req, res) {
	// Make a unique key for this request
	db.view(speeddesign, 'userspeed', {stale: "ok", 'keys': req.screen_name}, function(err, body) {
		res.send(body);
	});
}

exports.getUserNames = function(req, res) {
	db.view(speeddesign, 'userspeed-users', {stale: "ok" }, function(err, body) {
		res.send(body);
	});
}

//------------------------------  END  FILE  ------------------------------//