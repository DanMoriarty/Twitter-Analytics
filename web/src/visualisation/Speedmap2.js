import React, { Component } from 'react';
import _ from "lodash";
import ReactDOM from 'react-dom'
// import { withGoogleMap, GoogleMap } from "react-google-maps";
import GMap from './GMap.js'



const MELBOURNE = {
  lat: -37.7684635, 
  lng: 144.8711918
};



export default class Speedmap2 extends React.Component {
  constructor(props) {
    super(props);
    //attachSentimentToGeo=this.bind(attachSentimentToGeo)

    this.create_lines = this.create_lines.bind(this);

  }
  
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: MELBOURNE,
      zoom: 12
    });
  }
    
  create_lines() {
  // example marker
  var marker = new google.maps.Marker({
          position: MELBOURNE,
          map: this.map,
          title: 'Hello World!'
        });

  var markerTest = {"rows":[{"id":"leyee_le","key":[1,"339220882906034176","339220887863701504"],"value":[113.49222264463913,"Tue May 28 03:25:35 +0000 2013","Tue May 28 03:25:36 +0000 2013",[144.95303813,-37.81284532],[144.9533711,-37.81273956]]},
{"id":"KrazyKol","key":[1,"438231295202955264","438231301980962816"],"value":[40096.79295237153,"Tue Feb 25 08:37:37 +0000 2014","Tue Feb 25 08:37:38 +0000 2014",[145.342965,-37.749259],[145.270516,-37.83145]]}]}


  for (var i =0; i<20;i++) {
      console.log(i)
      console.log(markerTest['rows'][0]['value'][3][0])
      console.log( {
              lat: markerTest['rows'][i]['value'][3][1],
              lng: markerTest['rows'][i]['value'][3][0]
            })
      var marker1 = new google.maps.Marker({
            position: {
              lat: markerTest['rows'][i]['value'][3][1],
              lng: markerTest['rows'][i]['value'][3][0]
            },
            map: map,
            title: 'first'//users name
          })
          console.log("marker:")
        console.log(marker1.getPosition())
     

          i++;

      var marker2 = new google.maps.Marker({
              position: {
                lat: markerTest['rows'][i]['value'][4][1],
              lng: markerTest['rows'][i]['value'][4][0]
              },
            map: this.map,
            title: 'second'//users name
          });

      var path = new google.maps.Polyline({
          path: [
            marker1.getPosition(),
            marker2.getPosition(),
            ],

          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
          
        });
       path.setMap(map);
    }
    
  
  var suburbLayer = new google.maps.Data();
  var localjson=null;
  
  suburbLayer.loadGeoJson(localjson);






  var infoWindow = new google.maps.InfoWindow({
  content: ""
  });

  }

  render() {
    const mapStyle = {
      width: 700,
      height: 700,
    };
    
    return (
        <div>
          <div ref="map" style={mapStyle}>I should be a map!</div>
        </div>  

    );
  }
}
