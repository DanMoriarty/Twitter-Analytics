//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   Component implementing a Google map that displays user
//               movements
//               cards and input fields for interacting with the user.
//    Modified:  09/05/2017
//---------------------------- DESCRIPTION ----------------------------//

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline } from "react-google-maps";
import _ from "lodash";
import * as Constants from '../Constants.js';
import Loading from '../material/Loading.js';

const MelbourneMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: -37.815790, lng: 144.961341, }} // Melb Coords
    onClick={props.onMapClick}
  >
  {props.polylines}
  </GoogleMap>
));


const path = [
{"lat":-37.81590,"lng":144.96141},{"lat":-37.533773,"lng":144.348933},{"lat":-37.533773,"lng":144.5933},{"lat":-37.73773,"lng":144.36933}
];



class MovementMap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      windowheight: '800px', 
      windowwidth: '2000px',
      speed3k150k3m: null,
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  componentDidMount() {
    this.setState({ windowheight: window.innerHeight + 'px', windowwidth: window.innerWidth + 'px'})

    fetch(Constants.APIPATH + 'speed3k150k3m', Constants.INIT)
        .then(result=>result.json()) 
        .then(items=> this.setState({speed3k150k3m: processSpeeds(items.rows), error:false}))
        .catch(error => console.log(error))
    
  }


  handleMapLoad(map) {
    this._mapComponent = map;
  }
  
  handleMapClick(event) {
    console.log("Clicked map at" + event.latLng)
  }

  render() {     
    if (!this.state.speed3k150k3m){
        return (<Loading />);
    }

    return (
      <div style={{height: this.state.windowheight}}>
        <MelbourneMap
          containerElement={<div style={{width: this.state.windowwidth, height: this.state.windowheight }} />}
          mapElement={<div style={{ height: this.state.windowheight }} />}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          polylines={this.state.speed3k150k3m}
         >
        </MelbourneMap>
      </div>
    );
  }
}

// Process the speed data as it arrives from the api into Polyline components
function processSpeeds(data) {  
  console.log("DATA ARRIVED");
  console.log(data);
  var polylines = [];
  
  for (var key in data){
    let lat1 = data[key].value[3][1];
    let lng1 = data[key].value[3][0];
    let lat2 = data[key].value[4][1];
    let lng2 = data[key].value[4][0];

    polylines.push(
      <Polyline
        path={[{"lat":lat1,"lng":lng1},{"lat":lat2,"lng":lng2}]}
        key={key}
        options={{  strokeColor:"red", 
                    geodesic:true, 
                    strokeOpacity: 0.8,
                    strokeWeight: 2,}}
      />
      );
  }
  
  return polylines
}

export default MovementMap;