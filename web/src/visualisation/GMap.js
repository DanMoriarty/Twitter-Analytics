import _ from "lodash";
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";

const MelbourneMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: -37.815790, lng: 144.961341, }} // Melb Coords
    onClick={props.onMapClick}
  >
  </GoogleMap>
));

class GMap extends Component {
  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleMapClick(event) {
    console.log("Clicked map at" + event.latLng)
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <MelbourneMap
          containerElement={
            <div style={{width: '100%', height: '100%'}} />
          }
          mapElement={
            <div style={{ height: '700px' }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
        />
      </div>
    );
  }
}

export default GMap;