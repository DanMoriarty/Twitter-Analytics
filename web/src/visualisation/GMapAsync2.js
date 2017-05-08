/* eslint-disable no-undef */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";
import _ from "lodash";
//import loadJS from './loadJS.js';
import scriptLoader from 'react-async-script-loader'

/* Since we can't add a google.maps.data layer to the React google maps component, try loading google maps api asynchronously
and constructing the map as a google maps object.
ISSUES:
-arise with loading the API script asynchronously
-With callback, initMap function is not recognised
-cannot render static html file in a new tab or in an iframe, must be a react component


*/

//EXAMPLE 1
//http://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
/*
export default class GMapAsync2 = React.createClass({
    
    
    componentDidMount: function() {
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
		
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBrXsh6sZYoCurN67TR0015R93biestUis&callback=initMap')
    },
    
    initMap: function initMap() {
			var map;
			var Melbourne = {lat: -37.796473, lng: 144.977661};
			map = new google.maps.Map(this.refs.map.getDOMNode(), {
				center: Melbourne,
				zoom: 12
			});
		},
    
    render: function() {
            return (
                <div>
				<div ref="map" style={{height: '500px', width: '500px'}}></div>
                </div>
            );
    }
});
*/

//one example of loading script
/*
function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
*/
//another example of loading script
  //@scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyDieZ7uAY4DPdT3Z4fp4KtykHl6dWryYdw&callback=initMap'])
  
//another
//export default scriptLoader("https://maps.googleapis.com/maps/api/js?key=AIzaSyDieZ7uAY4DPdT3Z4fp4KtykHl6dWryYdw")(GMapAsync2);
  
//export default GMapAsync2;

/*EXAMPLE 2
//Load script via callback function initMap
/*
  var map;
  function initMap(){
	  map = new google.maps.Map(map,{
          center: {lat: 10.794234, lng: 106.706541},
          zoom: 20
        });
	  
  }
*/  
//http://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require
scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyDieZ7uAY4DPdT3Z4fp4KtykHl6dWryYdw'])
export default class GMapAsync2 extends React.Component {
  constructor(props){
    super(props);  
	this.map=null;
  }
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: 10.794234, lng: 106.706541},
          zoom: 20
        });
	  }
	   else this.props.onError()
	}
  }

  render(){
    return ( 

		//<div>
		<div ref="map" style={{height: '400px', width: '450px'}}></div>
		//{ !this.map && <div className="center-md">Loading...</div> } 
		//</div>

    )
  }
}
//doesn't work because calls initMap after script has loaded but script wont load until initmaps called
//export default scriptLoader("https://maps.googleapis.com/maps/api/js?key=AIzaSyBrXsh6sZYoCurN67TR0015R93biestUis&callback=initMap")(GMapAsync2);

