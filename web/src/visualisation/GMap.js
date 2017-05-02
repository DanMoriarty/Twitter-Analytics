import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";
import _ from "lodash";

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
  constructor(props) {
    super(props);
    this.state = { windowheight: '700px', 'windowwidth': '700px' };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  componentDidMount() {
    this.setState({ windowheight: window.innerHeight + 'px', windowwidth: window.innerWidth + 'px'})
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
        />
      </div>
    );
  }
}

export default GMap;