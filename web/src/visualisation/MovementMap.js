import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline } from "react-google-maps";
import _ from "lodash";
import * as Constants from '../Constants.js';

const MelbourneMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: -37.815790, lng: 144.961341, }} // Melb Coords
    onClick={props.onMapClick}
  >
    <Polyline path={path} options={{strokeColor:"red"}}/>
  </GoogleMap>
));


const path = [
{"lat":-37.81590,"lng":144.96141},{"lat":-37.533773,"lng":144.348933}
];



class MovementMap extends Component {
  constructor(props) {
    super(props);
    this.state = { windowheight: '800px', 'windowwidth': '2000px' };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  componentDidMount() {
    this.setState({ windowheight: window.innerHeight + 'px', windowwidth: window.innerWidth + 'px'})
  
    fetch('http://localhost:4444/api/speed3k3m', Constants.INIT)
            .then(result=>result.json()) 
            .then(items=> this.setState({speed3k3m: processSpeeds(items.rows), error:false}))
            .catch(error => this.setState({error: true}))
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleMapClick(event) {
    console.log("Clicked map at" + event.latLng)
  }

  render() {    
    return (
      <div style={{height: this.state.windowheight}}>
        <MelbourneMap
          containerElement={
            <div style={{width: this.state.windowwidth, height: this.state.windowheight }} />
          }
          mapElement={
            <div style={{ height: this.state.windowheight }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
         >
        </MelbourneMap>
      </div>
    );
  }
}

function processSpeeds(data) {
	console.log(data);
}
//     let formattedSuburbs = {};
//     for (var speed in data) {
//         let suburbName = data[suburb].key;
//         console.log(suburbName);
//         let vals = data[suburb].value;
//         let suburbArr = []
//         for (var time in vals) {
//             let formattedTime = time.length > 1 ? time + ":00" : "0" + time + ":00" 
//             if (vals.hasOwnProperty(Number(time)) && (vals[Number(time)]["1"] > 0 || vals[Number(time)]["-1"] > 0)) {
//                 suburbArr.push({x: formattedTime, y: vals[Number(time)]["1"] / (vals[Number(time)]["1"] + vals[Number(time)]["-1"])});
//             } 
//         }

//         if (suburbName != null) {
//             formattedSuburbs[suburbName] = suburbArr;
//         } else {
//             formattedSuburbs["Melbourne Tweets"] = suburbArr;
//         }
//     }
//     return formattedSuburbs;
// }

export default MovementMap;