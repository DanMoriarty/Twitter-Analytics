//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   A lightweight layer sitting between our CouchDB database 
//               and web app to prevent direct access to the database.
//    Usage:     (PORT=xxxx) node app.js
//    Modified:  10/05/2017
//---------------------------- DESCRIPTION ----------------------------//


//----------------------------   PROGRAM   ----------------------------//
// Initialise app
var express     = require('express'),
    addRoutes   = require('./routes'),
    cors		= require('cors'),
    port        = process.env.PORT || 3000,
    app         = express()
    ;

// Allow cross domain access
app.use(cors())

// Get an instance of router
var router = express.Router();

// Assign api routes to the router
addRoutes(router)

// Add router to the app
app.use('/api', router);

// Listen
app.listen(port, function() {
    console.log("Listening on port " + port + "!");
});

//----------------------------  END  FILE  ----------------------------//