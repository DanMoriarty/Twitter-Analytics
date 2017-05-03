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

export const COLOURWHEEL = [
	"#E91E63", "#673AB7", "#2196F3", "#00BCD4", 
	"#4CAF50", "#CDDC39", "#FF9800", "#FF5722", 
	"#F44336", "#607D8B", "#9E9E9E" ];