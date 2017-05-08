import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polygon } from "react-google-maps";
import _ from "lodash";

const MelbourneMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: -37.815790, lng: 144.961341 }} // Melb Coords
    onClick={props.onMapClick}
  >
    <Polygon 
      paths={path}
      onClick={_.noop}
      onRightClick={_.noop}
      onDragStart={_.noop}
    />
  </GoogleMap>
));

const path = 
[
  [{"lat": -42.3009342, "lng": 150.2853237}, {"lat": -13.8812806, "lng": 170.9287479}, {"lat": -15.2666499, "lng": 116.9337753}, {"lat": -36.4019412, "lng": 116.8621811} ],
  [{"lat": -20.3009342, "lng": 150.2853237}, {"lat": -13.8812806, "lng": 149.9287479}, {"lat": -15.2666499, "lng": 116.9337753}, {"lat": -36.4019412, "lng": 116.8621811} ],
]

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
          mylines={this.props.processedP}
        >
        </MelbourneMap>
      </div>
    );
  }
}

export default GMap;