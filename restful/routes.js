//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   Define API Routes
//    Modified:  10/05/2017
//---------------------------- DESCRIPTION ----------------------------//

'use strict';

//----------------------------   ROUTES   -----------------------------//

module.exports = function(router) {
	// Grab the controller functions
	var controller = require('./controller');

	// Define general middleware (log each request to console)
	router.use(function(req, res, next) {
		console.log(req.method + " request made to " + req.originalUrl);
		next();
	});

	// Define API Home Route
	router.get('/', function(req, res) {
		res.send("Welcome to the Melbourne Tweets API!");
	});

	// Define DB access Routes
	router.get('/userTweets', controller.getUserTweets);
	router.get('/userTweets/:key', controller.getUserTweetsKey);
	router.get('/speed', controller.getSpeed);
	router.get('/suburbSentiment', controller.getSuburbSentiment);
	router.get('/suburbSentimentTime', controller.getSuburbSentimentTime);
	router.get('/sentimentTime', controller.getSentimentTime);
	router.get('/languageModel/:tweet', controller.runLanguageModel);
	router.get('/deviceSentiment/', controller.getDeviceSentiment);
	router.get('/speed3k/', controller.getSpeed3k);
	router.get('/speed3k150k3m/', controller.getSpeed3k150k3m);
	router.get('/userLocations', controller.getUserLocations);
	router.get('/userLocations/:screen_name', controller.getUserLocationsKey);
	router.get('/userNames', controller.getUserNames);

	//----------------------   ROUTES   -----------------------//
	
	// router middleware to handle 'key'
	router.param('key', function(req, res, next, key) {
		// update key
		req.key = key.split("&");
		next();
	})

	// router middleware to handle 'tweet'
	router.param('tweet', function(req, res, next, tweet) {
		// update key
		req.tweet = tweet.split("&");
		next();
	})

	// router middleware to handle 'screen_name'
	router.param('screen_name', function(req, res, next, screen_name) {
		// update key
		req.screen_name = screen_name.split("&popeye&hogscafe&");
		next();
	})
};

//----------------------------  END  FILE  ----------------------------//