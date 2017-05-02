export const HOME = 'HOME';
export const SENTIMENT = 'SENTIMENT';
export const SPEED = 'SPEED';
export const LANGUAGE = 'LANGUAGE';
export const GRAPHS = 'GRAPHS';
export const AUTHORS = 'AUTHORS';

// Load Data from the API
var myHeaders = new Headers();
export const INIT = 
		{ 
			method: 'GET',
        	headers: myHeaders,
        	mode: 'cors',
        	cache: 'default' 
       };

