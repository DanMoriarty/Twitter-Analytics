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
	router.get('/speed', controller.getSpeed);
	router.get('/speedStale', controller.getSpeedStale);
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

	//--------------- PLAYING WITH KEYS ---------------//
	// router middleware to handle key
	router.param('key', function(req, res, next, key) {
		// update key
		req.key = key.split("&");
		next();
	})

	router.param('tweet', function(req, res, next, tweet) {
		// update key
		req.tweet = tweet.split("&");
		next();
	})

	router.param('screen_name', function(req, res, next, screen_name) {
		// update key
		req.screen_name = screen_name.split("&popeye&hogscafe&");
		next();
	})

	router.get('/modKey/', function(req, res) {
		res.send('view with no key');
	});

	router.get('/modKey/:key', function(req, res) {
		res.send('view with modded key: ' + req.key);
	});

	router.get('/noModKey/:inp', function(req, res) {
		res.send('view with the key: ' + req.params.inp);
	});
	//------------------ END PLAYING ------------------//
};

//----------------------------  END  FILE  ----------------------------//