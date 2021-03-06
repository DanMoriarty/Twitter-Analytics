//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   Component implementing a "user movement" google map, which
//               that displays user
//    Modified:  09/05/2017
//---------------------------- DESCRIPTION ----------------------------//

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline, Circle } from "react-google-maps";
import _ from "lodash";
import * as Constants from '../Constants.js';
import Loading from '../material/Loading.js';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

const MelbourneMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: -37.815790, lng: 144.961341, }} // Melb Coords
    onClick={props.onMapClick}
  >
  <Polyline
    path={props.userspeed}
    options={{    strokeColor: 'red',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  geodesic:true}}
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
    fetch(Constants.APIPATH + 'userNames/', Constants.INIT)
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
    fetch(Constants.APIPATH + 'userLocations/' + user, Constants.INIT)
        .then(result=>result.json()) 
        .then(items=> this.setState({userspeed: processSpeeds(items.rows)}))
        .catch(error => console.log(error))
  }

  render() {     
    if (!this.state.usernames) {
        return (<Loading />);
    }

    return (
      <div className="container">
      <div style={{height: this.state.windowheight}}>
        
      <div className="left">
              <MelbourneMap
                containerElement={<div style={{width: this.state.windowwidth, height: this.state.windowheight }} />}
                mapElement={<div style={{ height: this.state.windowheight }} />}
                onMapLoad={this.handleMapLoad}
                onMapClick={this.handleMapClick}
                userspeed={this.state.userspeed}
               >
              </MelbourneMap>
      </div>

        <div className="right">
          <Card>
              <CardTitle 
                  title="User Tracker" 
                  subtitle="No more just following their feed, now you can follow their exact locations"
              />
              <CardText style={{textAlign: 'justify',}}>
      Twitter users that have their geocoordinates on leave a 
      trail behind them. Using the power of the Twitter API, 
      we can follow a users path and see each and every place they've been (as long as they tweeted about it!).
              </CardText>
              <div>
                  <div style={{margin: '15'}}>
                      <div style={{textAlign: 'center',}}>
                      <AutoComplete
                          floatingLabelText="Enter username"
                          filter={ AutoComplete.caseInsensitiveFilter }
                          dataSource={ this.state.usernames }
                          maxSearchResults={ 10 }
                          onNewRequest={ this.selectUser }
                        />
                      
                     <RaisedButton label="Search" secondary={true} onTouchTap={() => this.retrieveUser(this.state.selectedUser)} />
                      </div>
                      <br/>
                  </div>

              </div>

          </Card>
        </div>
      </div>
      </div>
    );
  }
}

// Process data from API format to GMap format.
function processSpeeds(data) {
  var path = []
  for (var key in data[0].value[0]) {
    let lat = data[0].value[0][key].coords2[1];
    let lng = data[0].value[0][key].coords2[0];

    path.push({"lat":lat,"lng":lng})
  }
  return path;
}

// Process usernames into an array
function processNames(data) {
  var names = []
  for (var i in data) {
    names.push(data[i].key);
    console.log(names);
  }
  return names;
}

export default UserMovementMap;