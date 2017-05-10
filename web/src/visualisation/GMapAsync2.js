/* eslint-disable no-undef */
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';

import _ from "lodash";
//import loadJS from './loadJS.js';
import ReactDOM from 'react-dom'
import * as Constants  from '../Constants.js'
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

var selectedP = 'Positive'
    var newProp = 'Positive'



export default class GMapAsync2 extends React.Component {
  constructor(props) {
    super(props);
    this.handlePositive=this.handlePositive.bind(this)

  }

  handlePositive() {
    console.log("clicked")

    newProp='Positive'
    console.log("changed to P")

}
 handleNegative() {
    console.log("clicked")

      newProp='Negative'
      console.log("changed to Negative")

}
 handleNeutral() {
    console.log("clicked")

      newProp='Neutral'
      console.log("changed to Neutral")

}
        





      
  

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: MELBOURNE,
      zoom: 12
    });


  
  console.log(selectedP)
	//var fileUrl = require('file-url'); <- if not windows
  //var localjson = JSON.parse(require('./Geo&1Dataset.json'))
	var suburbLayer = new google.maps.Data();
  //var localjson=null;
  //attachSentimentToGeo(this.props.suburbs, localjson)
  //suburbLayer.loadGeoJson(localjson);


  // Boundary data -> 'https://gist.github.com/DanMoriarty/dcde573fcf2a9866bb71e0b26398b588'
    //I get CORS issues
  
  // Locally saved Greater Melb Masterfile; in repo in /JSON -> './SA2Masterfile(MELB).json'
    //I get parsing issues, due to methods below used to parse a local file

  // USA states, used for testing -> 'https://gist.githubusercontent.com/dmarg/b2959e771ae680acbc95/raw/815a03f55d028dace4371c27d0b787ca0f2f2b5d/states.json'
    //Strangely no CORS issues
  //Parsing/Loading methods  
    //suburbLayer.loadGeoJson(JSON.parse(JSON.stringify(localjson)))
    suburbLayer.loadGeoJson('https://gist.githubusercontent.com/DanMoriarty/011b359551b169e2acf5dd91afcf6080/raw/509cc6a1fb890656c57952554ce042d4b6691f30/MelbSent%2525.jsonp')
    //suburbLayer.loadGeoJson('https://gist.github.com/DanMoriarty/dcde573fcf2a9866bb71e0b26398b588',) // <- may not work b/c private
		//suburbLayer.loadGeoJson(fileUrl('./SA2Masterfile(MELB).json'));
		//suburbLayer.GeoJson('./EmptySA2.json');
	
  //suburbLayer.loadGeoJson('https://gist.githubusercontent.com/dmarg/b2959e771ae680acbc95/raw/815a03f55d028dace4371c27d0b787ca0f2f2b5d/states.json')	
    suburbLayer.setMap(this.map)  
	
  //console.log('first:')
  //console.log(suburbLayer.getFeatureById(0).getProperty('SA2_NAME16'))
  
  //console.log('second:')
  //console.log(suburbLayer.getFeatureById('0').getProperty('SA2_NAME16'))


  var max = 100.0;
  var min = 0.0;

  

  function getSmartColor(prop) {
          var low = [5, 69, 54];  // color of smallest datum
          var high = [151, 150, 4];   // color of largest datum


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
          fillColor: getSmartColor(feature.getProperty('selectedP')), // call function to get color for state based on the ...
        //catch
        //  fillColor: '#b3b3b3',
        fillOpacity: 0.9,
        strokeColor: '#b3b3b3',
        strokeWeight: 1,
        zIndex: 1,
        visible: true
        };
        });
  },3000);
          var infoWindow = new google.maps.InfoWindow({
  content: ""
  });
        
        //sets infowindow on a click
      suburbLayer.addListener('click', function(e) {

        console.log(e);
        infoWindow.setContent('<div style="line-height:1.00;overflow:hidden;white-space:nowrap;">' +
        e.feature.getProperty('SA2_NAME16')
          + '<br> ' + selectedP + ': ' + e.feature.getProperty(selectedP)
          + '%'+'</div>');
      //sets position of infowindow
      var anchor = new google.maps.MVCObject();
      anchor.set("position", e.latLng);
      infoWindow.open(this.map, anchor);
      });
        
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

      suburbLayer.addListener('rightclick', function(e) {
        console.log('right click');
        selectedP=newProp
        console.log(selectedP);
        //toggleProperty();
        //console.log(selectedP);
        suburbLayer.setStyle(function(feature){
        return {
        //try
          fillColor: getSmartColor(feature.getProperty(selectedP)), // call function to get color for state based on the ...
        //catch
        //  fillColor: '#b3b3b3',
        fillOpacity: 0.9,
        strokeColor: '#b3b3b3',
        strokeWeight: 1,
        zIndex: 1,
        visible: true
        };
        });
        
      });
    
}

  render() {
    const mapStyle = {
      width: "100%",
      height: "100%",
    };
    
    return (

        <div>
          <RaisedButton
                onClick = {this.handlePositive}
                label="Positive"
                primary={true}
              />
          <RaisedButton
                onClick = {this.handleNegative}
                label="Negative"
                primary={true}
              />
         <RaisedButton
                onClick = {this.handleNeutral}
                label="Neutral"
                primary={true}
              />
              
              <RaisedButton
      href="https://gist.github.com/DanMoriarty/8338dd8633d2a58a4300a348c8064d8f"
      target="_blank"
      label="Raw"
      secondary={true}
    />
              
    
          <div style={{width: "100%", height: "400px"}}>
            <div ref="map" style={mapStyle}>I should be a map!</div>
          </div>
        </div>  

    );
  }
}
