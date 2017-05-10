import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline } from "react-google-maps";
import _ from "lodash";
import * as Constants from '../Constants.js';
import Loading from '../material/Loading.js';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


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
      selectedUser: null,
      usernames: [],
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.clearUser = this.clearUser.bind(this);
  }

  componentDidMount() {
    this.setState({ windowheight: window.innerHeight + 'px', windowwidth: window.innerWidth + 'px'});
// TODO CHANGE THIS TO fetch USER'S SPEED DATA
// NEED TO ADD ROUTES FIRST
    fetch('http://localhost:4444/api/userNames/', Constants.INIT)
      .then(result=>result.json()) 
      .then(items=> this.setState({usernames: processNames(items.rows)}))
      .catch(error => console.log(error))
  }
  selectUser(chosenRequest, index) {
        if (index === -1)
            return null;

        this.setState({selectedUser: chosenRequest});
  }

  clearUser(chosenRequest, index) {
        this.setState({selectedUser: null});
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleMapClick(event) {
    console.log("Clicked map at" + event.latLng)
  }

  retrieveUser(user) {
    fetch('http://localhost:4444/api/userLocations/' + user, Constants.INIT)
        .then(result=>result.json()) 
        .then(items=> this.setState({userspeed: processSpeeds(items.rows)}))
        .catch(error => console.log(error))
  }

  render() {     
// TODO PUT THIS BACK ONCE FETCH IS ADDED
    // if (!this.state.userspeed){
    //     console.log("loading")
    //     return (<Loading />);
    // }

    console.log("LOADED");
    console.log(this.state.usernames);
    return (
      <div style={{height: this.state.windowheight}}>
        <AutoComplete
          floatingLabelText="Enter username"
          filter={ AutoComplete.caseInsensitiveFilter }
          dataSource={ this.state.usernames }
          maxSearchResults={ 5 }
          onNewRequest={ this.selectUser }
        />
        <RaisedButton label="Search" secondary={true} onTouchTap={() => this.retrieveUser(this.state.selectedUser)} />
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

function processNames(data) {
  // TODO NEED TO REMOVE THIS WHEN FETCH REPLACES IT
  console.log("DATA ARRIVING");
  console.log(data)
  
  
  console.log("DATA ARRIVED");
  // console.log(data);
  // var polylines = [];
  console.log(data[1].key)

  var names = []
  for (var i in data){
    names.push(data[i].key);
    console.log(names);
    }

  return names;

}

export default UserMovementMap;