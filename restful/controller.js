//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   Define API Controllers
//    Modified:  10/05/2017
//---------------------------- DESCRIPTION ----------------------------//

'use strict';
//--------------------------   CONTROLLERS   --------------------------//

// Initialise connection to CouchDB database
var nano		= require('nano')('http://115.146.93.56:8888/'),
	db_name 	= 'melbtweets2',
	test_db_name = 'melbtweets_sentiment',
	db 			= nano.use(db_name),
	design		= 'viewsfile',
	speeddesign = 'speed',
	sadesign	= 'sa2'
	;

// Invoke a python shell to handle interaction with the language models
var PythonShell = require('python-shell'),
	pyshell 	= new PythonShell('../Sentiment\ Analysis/langModel.py'),
	resBuffer 	= {},
	SEP 		= "^^^&$&$&^^^"
	;

// Event listener, handles python STDOUT
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

// Send data to python STDIN
exports.runLanguageModel = function(req, res) {
	// Make a unique key for this request
	let key = req.tweet + SEP + new Date().getTime()

	// add the key to the buffer
	resBuffer[key] = res; 

	// Send the key to python
	pyshell.send(key);
}


// Grab the all-over-1kph view
exports.getSpeed = function(req, res) {
	db.view(speeddesign, 'all-over-1kph', function(err, body) {
		res.send(body);
		console.log(err);
	});
}

// Grab the view containing number of tweets by each user (group: 1)
exports.getUserTweets = function(req, res) {
	db.view(design, 'all-tweets-by-user', { stale: "ok", group_level: 1 }, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing number of tweets belonging to specific users
exports.getUserTweetsKey = function(req, res) {
	db.view(design, 'all-tweets-by-user', { group: true, 'keys': req.key }, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing sentiments for each suburb
exports.getSuburbSentiment = function(req, res) {
	db.view(sadesign, 'sa2-sentiment', { stale: "ok", group_level: 1 }, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing sentiment at each hour for each suburb (group 1)
exports.getSuburbSentimentTime = function(req, res) {
	db.view(sadesign, 'sa2-timeofday', { stale: "ok", group_level: 1 }, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing sentiment at each hour
exports.getSentimentTime = function(req, res) {
	db.view(sadesign, 'sa2-timeofday', { stale: "ok", group_level: 0 }, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing sentiment for each kind of device
exports.getDeviceSentiment = function(req, res) {
	db.view('sources', 'tweet-specific-sources-with-sentiment', { stale: "ok", group_level: 2 }, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing speeds over 3kph
exports.getSpeed3k = function(req, res) {
	db.view(speeddesign, 'both-in-melb-between-over-3ph', {stale: "ok",group_level: 0,reduce:false}, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing speeds between 3kph and 150kph in Melbourne
exports.getSpeed3k150k3m = function(req, res) {
	db.view(speeddesign, 'both-in-melb-between-3-and-150kph-within-3-mins', {stale: "ok"}, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing user locations (all users)
exports.getUserLocations = function(req, res) {
	db.view(speeddesign, 'userspeed', {stale: "ok"}, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing user locations (specified user)
exports.getUserLocationsKey = function(req, res) {
	// Make a unique key for this request
	db.view(speeddesign, 'userspeed', {stale: "ok", 'keys': req.screen_name}, function(err, body) {
		res.send(body);
	});
}

// Grab the view containing all users with speeds
exports.getUserNames = function(req, res) {
	db.view(speeddesign, 'userspeed-users', {stale: "ok" }, function(err, body) {
		res.send(body);
	});
}

//------------------------------  END  FILE  ------------------------------//