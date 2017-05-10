import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polygon, InfoWindow, Marker } from "react-google-maps";
import { _, cloneDeep } from "lodash";

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
            let x = data[key]["data"];
            if (minX == null || maxX == null) {minX = x; maxX = x;}
            if (x < minX) minX = x;
            else if (x > maxX) maxX = x; }}
    let denom = maxX - minX;
    let nData = {};
    for (var key2 in data) {
        if (data.hasOwnProperty(key2))
            nData[key2] = Math.round( 5.0*(data[key2]["data"] - minX) / denom )
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
    {
      props.polygons.map((polygon, index) => (
        <Polygon 
          path={polygon.path}
          key={index}
          onClick={() => props.handlePolyClick(polygon)}
          options={polygon.options}
        >
        </Polygon>
    ))}

    {props.windows.map(win => (
      <InfoWindow 
        position={win.position}
        key={win.key}
        onCloseClick={() => props.handlePolyClose(win)}
      >
        <div>
          <h3>{ win.suburb }</h3>
          <p>{ win.info }</p>
        </div>
      </InfoWindow>
    ))}
  </GoogleMap>
));

class GChoropleth extends Component {
  constructor(props) {
    super(props);
    this.state = { windowheight: window.innerHeight + 'px', 'windowwidth': window.innerWidth + 'px', windows: [] };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handlePolyClick = this.handlePolyClick.bind(this);
    this.handlePolyClose = this.handlePolyClose.bind(this);
  }

  componentDidMount() {
    this.setState({ windowheight: window.innerHeight + 'px', windowwidth: window.innerWidth + 'px'})
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handlePolyClick(target) {
    if (!this.props.data.hasOwnProperty(target.key)) {
      return;
    }

    let w = cloneDeep(this.state.windows)

    let c1 = target.path[0],
        c2 = target.path[Math.floor(target.path.length / 2)],
        coords = {lat: (c1['lat'] + c2['lat']) / 2, lng: (c1['lng'] + c2['lng']) / 2}

    w.push(
    {
      position: coords,
      key: Date.now(),
      suburb: target.key,
      info: this.props.data[target.key]["info"]
    })

    this.setState({
      windows: w,
    });
  }

  handlePolyClose(target) {
    let w = cloneDeep(this.state.windows),
        wout = [];

    for (var thiswin in w) {
      let p1 = w[thiswin].position,
          p2 = target.position;

      if (p1.lat != p2.lat || p1.lng != p2.lng)
        wout.push(w[thiswin])
    }

    this.setState({windows: wout});
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
        {path: this.props.melbPolygons[key], key: key, options: {fillColor: choroColour, strokeWeight: 1, fillOpacity: 0.8}}
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
          handlePolyClick={this.handlePolyClick}
          handlePolyClose={this.handlePolyClose}
          windows={this.state.windows}
        >
        </MelbourneMap>
      </div>
    );
  }
}

export default GChoropleth;