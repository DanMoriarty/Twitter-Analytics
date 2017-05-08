import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polygon } from "react-google-maps";
import _ from "lodash";

const gamut2 = 
    {'1': "#C8E6C9",  '2': "#A5D6A7",  '3': "#81C784",  '4': "#66BB6A",
     '5': "#4CAF50",  '6': "#43A047",  '7': "#388E3C",  '8': "#2E7D32",
    '-1': "#B2EBF2", '-2': "#80DEEA", '-3': "#4DD0E1", '-4': "#26C6DA",
    '-5': "#00BCD4", '-6': "#00ACC1", '-7': "#0097A7", '-8': "#00838F",
     '0': "#F5F5F5"}

const gamut = 
    {'0': "#D32F2F", '1': "#E57373",  '2': "#FFCC80",  
     '3': "#C5E1A5", '4': "#81C784",  '5': "#388E3C"}

function normaliseData(data) {
    if (data == null) return {};
    let minX = null;
    let maxX = null;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            let x = data[key];
            if (minX == null || maxX == null) {minX = x; maxX = x;}
            if (x < minX) minX = x;
            else if (x > maxX) maxX = x; }}
    let denom = maxX - minX;
    let nData = {};
    for (var key2 in data) {
        if (data.hasOwnProperty(key2))
            nData[key2] = Math.round( 5.0*(data[key2]-minX)/denom )
    }
    return nData;
}

const MelbourneMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: -37.815790, lng: 144.961341 }} // Melb Coords
    onClick={props.onMapClick}
  >
    {props.polygons}
  </GoogleMap>
));

class GChoropleth extends Component {
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

    let polygons = [];
    let nData = normaliseData(this.props.data);

    for (var key in this.props.melbPolygons) {
      if (!this.props.melbPolygons.hasOwnProperty(key))
        continue;

      let choroColour = !nData.hasOwnProperty(key) ? gamut['2'] : gamut[nData[key]]

      polygons.push
      (
        <Polygon 
          path={this.props.melbPolygons[key]}
          key={key}
          onClick={_.noop}
          onRightClick={_.noop}
          onDragStart={_.noop}
          options={{fillColor: choroColour, strokeWeight: 1}}
        />
      )
    }

    return (
      <div style={{height: this.state.windowheight}}>
        <MelbourneMap
          containerElement={<div style={{width: this.state.windowwidth, height: this.state.windowheight }} />}
          mapElement={<div style={{ height: this.state.windowheight }} />}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          polygons={polygons}
          data={this.props.data}
        >
        </MelbourneMap>
        <div> {nData['Parkville']} </div>
      </div>
    );
  }
}

export default GChoropleth;