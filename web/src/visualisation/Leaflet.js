import Choropleth from 'react-leaflet-choropleth'
import { Map } from 'react-leaflet'
import React, { Component } from 'react';
import _ from "lodash";
import 'get-json';

/* Since it has been a challenge making a google map choropleth, attempt at making a leaflet-react map
from example https://www.npmjs.com/package/react-leaflet-choropleth

Error arises in loading the json and also a lack of documentation on how what the parameters are for the Leaflet
*/


const style = {
    fillColor: '#F28F3B',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.5
}
//var geoJson = "./SA2Masterfile.json";
var geoJson = 'https://gist.githubusercontent.com/dmarg/b2959e771ae680acbc95/raw/815a03f55d028dace4371c27d0b787ca0f2f2b5d/states.json';

//loading json file - methods: get-json library OR JSON parse

//var getJson = require('get-json')
/*
function getData() {
var request = new XMLHttpRequest();
request.open("GET", geoJson, false);
request.send(null);
request.onreadystatechange = function() {
  if ( request.readyState === 4 && request.status === 200 ) {
    var my_JSON_object = JSON.parse(request.responseText);
    var data = 	my_JSON_object;
	//console.log(my_JSON_object);
  }
}
return my_JSON_object;
}
*/
/*
var jsonResult;

$.ajax({
  dataType: "json",
  url: geojson,
  data: data,
  success: function(data) {
	   jsonResult = data;
	}
});
*/

var D1 = 'CountryOfBirth';
var A1 = 'Turkey_P';
var D2 = 'Education';
var A2 = '%u16Educated';

//These will be defined by the user
var DATASET = D1;
var ATTRIBUTE = A1;


const LMap = (geojson) => (
  <Map>
    <Choropleth
      data= {getData()}//{type: 'FeatureCollection', features: geojson}}
      valueProperty= {(feature) => feature.properties.DATASET.ATTRIBUTE}
      //visible={(feature) => feature.id !== active.id}
      scale={['#b3cde0', '#011f4b']}
      steps={7}
      mode='e'
      style={ {
		color: '#fff', // border color
		weight: 2,
		fillOpacity: 0.8
	  }}
      onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.DATASET.ATTRIBUTE)}
      ref={(el) => this.choropleth = el.leafletElement}
    />
  </Map>
)

//React component
class Leaflet extends Component {

	
  constructor(props) {
    super(props);
    this.state = { windowheight: '700px', 'windowwidth': '700px' };
  }
	
	componentDidMount() {
    this.setState({ windowheight: window.innerHeight + 'px', windowwidth: window.innerWidth + 'px'})
  }
  render() {

    return (
      <div style={{height: this.state.windowheight}}>
        <LMap/>
      </div>
    );
  }
}

export default Leaflet;