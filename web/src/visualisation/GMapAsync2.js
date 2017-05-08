/* eslint-disable no-undef */
import React, { Component } from 'react';

import _ from "lodash";
//import loadJS from './loadJS.js';
import ReactDOM from 'react-dom'
//import './Map.css'
//import fileUrl from 'file-url'


//var localjson = require('./SA2Masterfile(MELB).json')
/*
const MELBOURNE = {
  lat: -37.796473,
  lng: 144.977661
};
*/
//USA for testing
const MELBOURNE = {
  lat: -37.7684635, 
  lng: 144.8711918
};


var path = require('path');

function fileUrl(str) {
    if (typeof str !== 'string') {
        throw new Error('Expected a string');
    }

    var pathName = path.resolve(str).replace(/\\/g, '/');

    // Windows drive letter must be prefixed with a slash
    if (pathName[0] !== '/') {
        pathName = '/' + pathName;
    }

    return encodeURI('file://' + pathName);
};

// returns a color based on the value given when the function is called
function getColor(prop) {
var colors = [
  '#d1ccad',
  '#c2c083',
  '#cbd97c',
  '#acd033',
  '#89a844'
];
 return prop >= 120 ? colors[4] :
prop > 110 ? colors[3] :
prop > 100 ? colors[2] :
prop > 90 ? colors[1] :
colors[0];
};

export default class GMapAsync2 extends React.Component {
  constructor(props) {
    super(props);
    //attachSentimentToGeo=this.bind(attachSentimentToGeo)

  }
  
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: MELBOURNE,
      zoom: 12
    });

    
	console.log(this.props.thing)
  console.log(this.props.suburbs)
	var marker = new google.maps.Marker({
          position: MELBOURNE,
          map: this.map,
          title: 'Hello World!'
        });

	
    var D1 = 'CountryOfBirth';
    var A1 = 'Turkey_P';
    var D2 = 'Education';
    var A2 = '%u16Educated';
    
    //These will be defined by the drop down links
    var DATASET = D1;
    var ATTRIBUTE = A1;
    
	//var fileUrl = require('file-url'); <- if not windows
  //var localjson = JSON.parse(require('./Geo&1Dataset.json'))
	var suburbLayer = new google.maps.Data();
  var localjson=null;
  //attachSentimentToGeo(this.props.suburbs, localjson)
  suburbLayer.loadGeoJson(localjson);


  // Boundary data -> 'https://gist.github.com/DanMoriarty/dcde573fcf2a9866bb71e0b26398b588'
    //I get CORS issues
  
  // Locally saved Greater Melb Masterfile; in repo in /JSON -> './SA2Masterfile(MELB).json'
    //I get parsing issues, due to methods below used to parse a local file

  // USA states, used for testing -> 'https://gist.githubusercontent.com/dmarg/b2959e771ae680acbc95/raw/815a03f55d028dace4371c27d0b787ca0f2f2b5d/states.json'
    //Strangely no CORS issues
  //Parsing/Loading methods  
    //suburbLayer.loadGeoJson(JSON.parse(JSON.stringify(localjson)))
    //suburbLayer.loadGeoJson('https://gist.github.com/DanMoriarty/dcde573fcf2a9866bb71e0b26398b588') // <- may not work b/c private
		//suburbLayer.loadGeoJson(fileUrl('./SA2Masterfile(MELB).json'));
		//suburbLayer.GeoJson('./EmptySA2.json');
	
  //suburbLayer.loadGeoJson('https://gist.githubusercontent.com/dmarg/b2959e771ae680acbc95/raw/815a03f55d028dace4371c27d0b787ca0f2f2b5d/states.json')	
    suburbLayer.setMap(this.map)  
	
  //console.log('first:')
  //console.log(suburbLayer.getFeatureById(0).getProperty('SA2_NAME16'))
  
  //console.log('second:')
  //console.log(suburbLayer.getFeatureById('0').getProperty('SA2_NAME16'))
  console.log('third:')
  var i=0;
  suburbLayer.forEach(function(feature) {
    console.log(feature.getProperty('SA2_NAME16'))
    i=i+1
  })
  console.log('this is i:')
  console.log(i)
  /* USA suburb layering*/
  var max = 100.0;
  var min = 0.0;

  var infoWindow = new google.maps.InfoWindow({
  content: ""
  });

  function getSmartColor(alldatasets) {
          var prop = alldatasets[DATASET][ATTRIBUTE]
          var low = [5, 69, 54];  // color of smallest datum
          var high = [151, 83, 34];   // color of largest datum

          // delta represents where the value sits between the min and max
          var delta = (prop - min )/
            (max - min);

          var color = [];
          for (var i = 0; i < 3; i++) {
            // calculate an integer color based on the delta
            color[i] = (high[i] - low[i]) * delta + low[i];
          }
          return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)'
          //return rgbToHex(color[0], color[1], color[2]);
        }

  setTimeout(function() {
        // Set and apply styling to the Suburb Layer
      suburbLayer.setStyle(function(feature) {
        return {
        //try
          fillColor: '#d1ccad',//getSmartColor(feature.getProperty('Datasets')), // call function to get color for state based on the ...
        //catch
        //  fillColor: '#b3b3b3',
        fillOpacity: 0.9,
        strokeColor: '#b3b3b3',
        strokeWeight: 1,
        zIndex: 1,
        visible: true
        };
        });
  },2000);
        
        
        
      // Add mouseover and mouse out styling for the GeoJSON State data
      suburbLayer.addListener('mouseover', function(e) {
        suburbLayer.overrideStyle(e.feature, {
        strokeColor: '#2a2a2a',
        strokeWeight: 2,
        zIndex: 2
        });
      });

      
      
      suburbLayer.addListener('mouseout', function(e) {
        suburbLayer.revertStyle();
      });
    
}
  attachSentimentToGeo(sentiment, suburbs) {
    for (var i=0;i<suburbs['features'].length();i++){
      for (var j=0;j<sentiment['rows'].length();j++){
        if (sentiment['rows'][j]['key']===suburbs['features'][i]['properties']['SA2_NAME16']) {
          Sentiment = sentiment['rows'][j]['value']
          suburbs['features'][i]['properties'].push(Sentiment)
        }
      }

    }
  }
  render() {
    const mapStyle = {
      width: 1000,
      height: 400,
    };
    
    return (
        <div>
          <div ref="map" style={mapStyle}>I should be a map!</div>
        </div>  

    );
  }
}
