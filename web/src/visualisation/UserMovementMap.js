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
  <Polyline
    path={props.userspeed}
    options={{strokeColor:"red"}}
  />
  </GoogleMap>
));


const path = [
{"lat":-37.81590,"lng":144.96141},{"lat":-37.533773,"lng":144.348933},{"lat":-37.533773,"lng":144.5933},{"lat":-37.73773,"lng":144.36933}
];



class UserMovementMap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      windowheight: '800px', 
      windowwidth: '2000px',
      userspeed: null,
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  componentDidMount() {
    this.setState({ windowheight: window.innerHeight + 'px', windowwidth: window.innerWidth + 'px'});
// TODO CHANGE THIS TO fetch USER'S SPEED DATA
// NEED TO ADD ROUTES FIRST
    fetch('http://localhost:4444/api/userlocations/thebrockmurley',Constants.INIT)
        .then(result=>result.json()) 
        .then(items=> this.setState({userspeed: processSpeeds(items.rows), error:false}))
        .catch(error => console.log(error))
    
  }


  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleMapClick(event) {
    console.log("Clicked map at" + event.latLng)
  }

  render() {     
// TODO PUT THIS BACK ONCE FETCH IS ADDED
    if (!this.state.userspeed){
        console.log("loading")
        return (<Loading />);
    }

    console.log("LOADED");
    return (
      <div style={{height: this.state.windowheight}}>
        <MelbourneMap
          containerElement={<div style={{width: this.state.windowwidth, height: this.state.windowheight }} />}
          mapElement={<div style={{ height: this.state.windowheight }} />}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          userspeed={this.state.userspeed}
         >
        </MelbourneMap>
      </div>
    );
  }
}

function processSpeeds(data) {
  // TODO NEED TO REMOVE THIS WHEN FETCH REPLACES IT
  
  
  
  console.log("DATA ARRIVED");
  // console.log(data);
  // var polylines = [];
  console.log(data[0].value[0][0].coords2)

  var path = []
  for (var key in data[0].value[0]){
    let lat = data[0].value[0][key].coords2[1];
    let lng = data[0].value[0][key].coords2[0];
    console.log(lat)
    path.push({"lat":lat,"lng":lng})
    }
  console.log("THIS IS HERE")
  console.log(path);  
  // var path2 = [{"lat":-37.76979974,"lng":144.99732236},{"lat":-37.77025159,"lng":144.99722896}];
  // console.log(path2);

  // const path3 = [
  // {"lat":-37.81590,"lng":144.96141},{"lat":-37.533773,"lng":144.348933},{"lat":-37.533773,"lng":144.5933},{"lat":-37.73773,"lng":144.36933}
  // ];
  // console.log(path3);
  return path;

}

export default UserMovementMap;