/* eslint-disable no-undef */
import React, { Component } from 'react';

import _ from "lodash";
//import loadJS from './loadJS.js';
import ReactDOM from 'react-dom'
//import './Map.css'

/*
const MELBOURNE = {
  lat: -37.796473,
  lng: 144.977661
};
*/
//USA for testing
const MELBOURNE = {
  lat: 38.992780, 
  lng: -94.930483
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

export default class Speedmap extends React.Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    
      var Melbourne = {lat: -37.796473, lng: 144.977661};
        this.map = new google.maps.Map(document.getElementById('map'), {
      center: Melbourne,
      zoom: 10
        });
    

    
    //speeds = 'http://115.146.92.136:8888/melbtweets2/_design/speed/_view/both-in-melb-over-3kph-within-3-minutes?limit=20&reduce=false'

    var markerTest = {"total_rows":3944,"offset":0,
    "rows":[{
      "id":"bryanjhickey",
      "key":[1,"27878941398147072","27878945491787776"],
    "value":[718.47966345006,"Thu Jan 20 00:03:52 +0000 2011","Thu Jan 20 00:03:53 +0000 2011", [144.74305326,-37.73290242],[144.744685,-37.731655]]
  },
{"id":"leyee_le","key":[1,"339220882906034176","339220887863701504"],"value":[113.49222264463913,"Tue May 28 03:25:35 +0000 2013","Tue May 28 03:25:36 +0000 2013",[144.95303813,-37.81284532],[144.9533711,-37.81273956]]},
{"id":"KrazyKol","key":[1,"438231295202955264","438231301980962816"],"value":[40096.79295237153,"Tue Feb 25 08:37:37 +0000 2014","Tue Feb 25 08:37:38 +0000 2014",[145.342965,-37.749259],[145.270516,-37.83145]]},
{"id":"KrazyKol","key":[1,"454554260311904256","454554265332498432"],"value":[40170.9468251187,"Fri Apr 11 09:39:15 +0000 2014","Fri Apr 11 09:39:16 +0000 2014",[145.343103,-37.749255],[145.270569,-37.831625]]},
{"id":"KrazyKol","key":[1,"455998158141931520","455998163032494080"],"value":[40161.74502123074,"Tue Apr 15 09:16:47 +0000 2014","Tue Apr 15 09:16:48 +0000 2014",[145.270595,-37.831658],[145.343189,-37.749349]]},
{"id":"KrazyKol","key":[1,"458383654323228672","458383661050908672"],"value":[39600.53432440181,"Mon Apr 21 23:15:54 +0000 2014","Mon Apr 21 23:15:55 +0000 2014",[145.273225,-37.836624],[145.346816,-37.756593]]},
{"id":"KrazyKol","key":[1,"462594122684313601","462594126769577984"],"value":[816.7740970273342,"Sat May 03 14:06:48 +0000 2014","Sat May 03 14:06:49 +0000 2014",[144.95111,-37.817884],[144.948534,-37.817735]]},
{"id":"KrazyKol","key":[1,"486432474470547456","486432480963358720"],"value":[2119.71549997842,"Tue Jul 08 08:51:54 +0000 2014","Tue Jul 08 08:51:55 +0000 2014",[145.272743,-37.836661],[145.270718,-37.831613]]},
{"id":"KrazyKol","key":[1,"524055783303299072","524055785484353536"],"value":[39622.1063290121,"Mon Oct 20 04:33:29 +0000 2014","Mon Oct 20 04:33:30 +0000 2014",[145.346926,-37.756556],[145.273273,-37.836618]]},
{"id":"KrazyKol","key":[1,"524120047372226560","524120049146396673"],"value":[38690.642423280944,"Mon Oct 20 08:48:51 +0000 2014","Mon Oct 20 08:48:52 +0000 2014",[145.275523,-37.829943],[145.343095,-37.74938]]},
{"id":"OrgCollective","key":[1,"530961665492549632","530961669338726400"],"value":[18734.73879738368,"Sat Nov 08 05:55:00 +0000 2014","Sat Nov 08 05:55:01 +0000 2014",[144.95303739,-37.81849318],[144.90665629,-37.78938248]]},
{"id":"Rez230","key":[1,"576400191261003777","576400198450057217"],"value":[9658.064091675125,"Fri Mar 13 15:11:29 +0000 2015","Fri Mar 13 15:11:30 +0000 2015",[144.9797489,-37.80594993],[144.94952357,-37.80251592]]},
{"id":"fluffyvla11","key":[1,"635392010506096640","635392013815390212"],"value":[13469.297370226464,"Sun Aug 23 10:03:54 +0000 2015","Sun Aug 23 10:03:55 +0000 2015",[144.991586,-37.838961],[144.9674246,-37.81124908]]},
{"id":"Daymeaux","key":[1,"743723750609195010","743723756401496064"],"value":[138.6167334289847,"Fri Jun 17 08:35:34 +0000 2016","Fri Jun 17 08:35:35 +0000 2016",[144.9485658,-37.79874689],[144.949,-37.7987]]},
{"id":"Daymeaux","key":[1,"826699330677514242","826699336390148096"],"value":[113.03575183284576,"Wed Feb 01 07:50:54 +0000 2017","Wed Feb 01 07:50:55 +0000 2017",[144.906,-37.8004],[144.90635723,-37.80039209]]},
{"id":"VicTraffic","key":[1,"834203814383063040","834203819055607809"],"value":[14626.766126596378,"Wed Feb 22 00:51:02 +0000 2017","Wed Feb 22 00:51:03 +0000 2017",[145.0817974,-37.9272361],[145.048505,-37.9526474]]},
{"id":"VicTraffic","key":[1,"834204568451846144","834204573132681217"],"value":[179336.60446376225,"Wed Feb 22 00:54:02 +0000 2017","Wed Feb 22 00:54:03 +0000 2017",[144.6910556,-37.8344597],[145.24651,-37.9266513]]},
{"id":"VicTraffic","key":[1,"834205324697432064","834205329407684608"],"value":[96576.11941528445,"Wed Feb 22 00:57:02 +0000 2017","Wed Feb 22 00:57:03 +0000 2017",[145.2330671,-37.9280104],[144.9600172,-37.8196135]]},
{"id":"VicTraffic","key":[1,"834558654774857728","834558659615076352"],"value":[163909.38291412056,"Thu Feb 23 00:21:03 +0000 2017","Thu Feb 23 00:21:04 +0000 2017",[145.0819524,-37.9264462],[145.0272395,-37.519275]]},
{"id":"VicTraffic","key":[1,"834564697055653888","834564701652520960"],"value":[117747.89483617985,"Thu Feb 23 00:45:03 +0000 2017","Thu Feb 23 00:45:04 +0000 2017",[144.8899943,-37.8448627],[145.2612392,-37.869508]]}
]};
    var markers = [{x: -36.796473, y: 144.977661}, {x: -37.796473, y: 143.977661}]
    
      // LOADING DATA //    
    //var suburbLayer = new google.maps.Data();
    //suburbLayer.loadGeoJson('http://localhost:4444/api/suburbSentiment');
    
    /*
      // CREATING AN INFOWINDOW //
    // Set a blank infoWindow to be used for each to suburb on click
    var infoWindow = new google.maps.InfoWindow({
      content: ""
    });
    */
    
    
    
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
