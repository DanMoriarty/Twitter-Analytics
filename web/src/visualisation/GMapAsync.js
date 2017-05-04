/* eslint-disable no-undef */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";
import _ from "lodash";
//import loadJS from './loadJS.js';
import scriptLoader from 'react-async-script-loader'
import './Choropleth.js'
import GMap, {MelbourneMap} from './GMap.js'

//import json from 'json-loader!';

//TODO
  //Incorporate into restful files to get json from couch
  //Look at react kml libraries or other for speed
  
var max = 100.0;

var min = 0.0;	
//var subs = require("json!./SA2Masterfile.json");

		
 class GMapAsync extends React.Component {
  constructor(props){
    super(props);
    this.map = null;    
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
		console.log("loaded");
		
		setTimeout(function() {
			console.log("HELLO");
		},5000);
		console.log(min);
		//var suburbs = JSON.parse(subs);
        var suburbLayer = new google.maps.Data();
		//suburbLayer.loadGeoJson('./SA2Masterfile.json');
		suburbLayer.loadGeoJson('https://gist.githubusercontent.com/dmarg/b2959e771ae680acbc95/raw/815a03f55d028dace4371c27d0b787ca0f2f2b5d/states.json')
		//suburbLayer.addGeoJson(suburbs);
		// returns a color based on the value given when the function is called
		
		  function getColor(alldatasets) {
			var prop = alldatasets[DATASET][ATTRIBUTE]
			var colors = [
			  '#d1ccad',
			  '#c2c083',
			  '#cbd97c',
			  '#acd033',
			  '#89a844'
			];
			 return prop >= 80 ? colors[4] :
			prop > 70 ? colors[3] :
			prop > 60 ? colors[2] :
			prop > 50 ? colors[1] :
			colors[0];
			}
			setTimeout(function() {
			suburbLayer.setStyle(function(feature){
				console.log(min);
				return {
				//try
					//fillColor: getSmartColor(feature.getProperty('Datasets')), // call function to get color for state based on the ...
				//catch
					fillColor: '#d1ccad',
				fillOpacity: 0.9,
				strokeColor: '#b3b3b3',
				strokeWeight: 1,
				zIndex: 1,
				visible: true
				};
			  });
			 },2000);
		setTimeout(function() {
			console.log('ASFGYDUHJVHK');
			suburbLayer.forEach(function() {
			 console.log('dadsdsds');
			});
		},2000);
		//this.map = new google.maps.Map(this.refs.map, {
          //center: Melbourne,
          //zoom: 12
        //});
		//suburbLayer.setMap(m);
		
		//this.map = m;
		setTimeout(function() {
		suburbLayer.setMap(MelbourneMap);
		},4000);
		console.log(min);
			  
		  
		

  }

  render(){
    return ( 

		<div>
		<div ref="map" style={{height: '800px', width: '1000px'}}></div>
		{ !this.map && <div className="center-md">Loading...</div> } 
		</div>

    )
  }
}
//export default scriptLoader("http://maps.googleapis.com/maps/api/js?v=3")(GMapAsync);

function getMax() {
			max = 0.0
				suburbLayer.forEach(function(feature){
					if (feature.getProperty('Datasets')[DATASET][ATTRIBUTE]>max)
						max = feature.getProperty('Datasets')[DATASET][ATTRIBUTE];
						
				});
				console.log(max);
			
		};
//export default GMapAsync;		
export default scriptLoader("https://maps.googleapis.com/maps/api/js?key=AIzaSyDieZ7uAY4DPdT3Z4fp4KtykHl6dWryYdw")(GMapAsync);
