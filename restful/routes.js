'use strict';

//----------------------------   ROUTES   ----------------------------//

module.exports = function(router) {
	// Grab the controller functions
	var controller = require('./controller');

	// Define general middleware (occurs on -every- request)
	router.use(function(req, res, next) {
		console.log(req.method + " request made to " + req.originalUrl);
		next();
	});

	// Define API Home Route
	router.get('/', function(req, res) {
		res.send("Welcome to the Melbourne Tweets API");
	});

	// Define DB access Routes
	router.get('/melbTweets', controller.getMelbTweets);
	router.get('/melbTweets/:key', controller.getMelbTweetsKey);
	router.get('/userTweets', controller.getUserTweets);
	router.get('/userTweets/:key', controller.getUserTweetsKey);
};

//----------------------------  END  FILE  ----------------------------//