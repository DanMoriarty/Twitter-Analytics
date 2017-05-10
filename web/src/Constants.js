//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   Define constants used throughout the web app.
//    Modified:  09/04/2017
//---------------------------- DESCRIPTION ----------------------------//

export const HOME = 'HOME';
export const SENTIMENT = 'SENTIMENT';
export const SPEED = 'SPEED';
export const LANGUAGE = 'LANGUAGE';
export const GRAPHS = 'GRAPHS';
export const AUTHORS = 'AUTHORS';
export const USER = 'USER';

// Load Data from the API
var myHeaders = new Headers();
export const INIT = 
		{ 
			method: 'GET',
        	headers: myHeaders,
        	mode: 'cors',
        	cache: 'default' 
       };

// Colour palette
export const COLOURWHEEL = [
	"#E91E63", "#673AB7", "#2196F3", "#00BCD4", 
	"#4CAF50", "#CDDC39", "#FF9800", "#FF5722", 
	"#F44336", "#607D8B", "#9E9E9E" ];

// Path to the API
export const APIPATH = "http://localhost:4444/api/" // http://115.146.92.136:3000/api/
