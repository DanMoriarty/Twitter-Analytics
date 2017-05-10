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
          polylines={this.state.speed3k150k3m}
         >
        </MelbourneMap>
      </div>
    );
  }
}

function processSpeeds(data) {
  // var str = {"total_rows":23,"offset":0,"rows":[{"id":"CazCooke","key":[3.004507734480376,61,"382736422160969728","382736679280181248"],"value":[3.004507734480376,"Wed Sep 25 05:20:48 +0000 2013","Wed Sep 25 05:21:49 +0000 2013",[144.99732236,-37.76979974],[144.99722896,-37.77025159]]},{"id":"MrRavMan","key":[3.0102250293008015,54,"268958610644664320","268958838345039873"],"value":[3.0102250293008015,"Thu Nov 15 06:08:24 +0000 2012","Thu Nov 15 06:09:18 +0000 2012",[145.1901993,-37.93323404],[145.19071412,-37.9332382]]},{"id":"CalEgan18","key":[3.015652389421366,97,"336446690699644929","336447098344071171"],"value":[3.015652389421366,"Mon May 20 11:41:56 +0000 2013","Mon May 20 11:43:33 +0000 2013",[145.22436825,-37.73717451],[145.22521196,-37.73687653]]},{"id":"desmelbourne","key":[3.019937734081912,54,"526539538319949825","526539766070657024"],"value":[3.019937734081912,"Mon Oct 27 01:03:03 +0000 2014","Mon Oct 27 01:03:57 +0000 2014",[144.93794657,-37.81145102],[144.93790425,-37.81185703]]},{"id":"flynnie06","key":[3.0297335932733738,42,"565138742751412224","565138919134470144"],"value":[3.0297335932733738,"Tue Feb 10 13:22:30 +0000 2015","Tue Feb 10 13:23:12 +0000 2015",[145.29182438,-38.04356669],[145.29142262,-38.04353606]]},{"id":"The_Impy","key":[3.0340358049821177,44,"519806094101594115","519806281113038851"],"value":[3.0340358049821177,"Wed Oct 08 11:06:45 +0000 2014","Wed Oct 08 11:07:29 +0000 2014",[144.97571856,-37.83933779],[144.97531367,-37.83943252]]},{"id":"barryhoney","key":[3.037482103584595,25,"449154094675263488","449154199700656128"],"value":[3.037482103584595,"Thu Mar 27 12:00:55 +0000 2014","Thu Mar 27 12:01:20 +0000 2014",[144.98263327,-37.81547219],[144.98256402,-37.81565383]]},{"id":"notout50","key":[3.0409960466027703,148,"708443239972511745","708443862478528517"],"value":[3.0409960466027703,"Sat Mar 12 00:03:25 +0000 2016","Sat Mar 12 00:05:53 +0000 2016",[145.01882315,-37.74752459],[145.01746633,-37.74718834]]},{"id":"jeffyourstrulee","key":[3.0466940815958345,93,"343556716232835073","343557107129393152"],"value":[3.0466940815958345,"Sun Jun 09 02:34:38 +0000 2013","Sun Jun 09 02:36:11 +0000 2013",[144.66642426,-37.92214275],[144.66726065,-37.92239907]]},{"id":"MrRavMan","key":[3.046769709475117,9,"310004442479087618","310004480529797122"],"value":[3.046769709475117,"Fri Mar 08 12:29:53 +0000 2013","Fri Mar 08 12:30:02 +0000 2013",[145.24217874,-38.06676152],[145.24224479,-38.06680611]]},{"id":"BenJLane","key":[3.061619142723456,139,"731026271136821248","731026855810240512"],"value":[3.061619142723456,"Fri May 13 07:40:19 +0000 2016","Fri May 13 07:42:38 +0000 2016",[144.99790688,-37.83658226],[144.99656125,-37.8365538]]},{"id":"kalih","key":[3.0654696538478845,14,"632740486864863232","632740546830835712"],"value":[3.0654696538478845,"Sun Aug 16 02:27:42 +0000 2015","Sun Aug 16 02:27:56 +0000 2015",[145.01090527,-37.81307269],[145.01094818,-37.81297098]]},{"id":"TomHayes86","key":[3.073393816577201,110,"284128225163112448","284128686901448704"],"value":[3.073393816577201,"Thu Dec 27 02:47:02 +0000 2012","Thu Dec 27 02:48:52 +0000 2012",[145.01107693,-37.81280146],[145.01041174,-37.81214033]]},{"id":"Camiliciouss","key":[3.07930390852587,44,"210564097681522693","210564282159595521"],"value":[3.07930390852587,"Thu Jun 07 02:49:27 +0000 2012","Thu Jun 07 02:50:11 +0000 2012",[144.88734512,-37.79228797],[144.88699294,-37.79209534]]},{"id":"martin_bull","key":[3.083328085274928,142,"814290409585131520","814291008489799680"],"value":[3.083328085274928,"Thu Dec 29 02:02:17 +0000 2016","Thu Dec 29 02:04:39 +0000 2016",[144.9665183,-37.8176888],[144.9651416,-37.8178052]]},{"id":"lesposen","key":[3.083856327949257,18,"777038917597999105","777038995838504960"],"value":[3.083856327949257,"Sat Sep 17 06:58:09 +0000 2016","Sat Sep 17 06:58:27 +0000 2016",[145.03374954,-37.8409272],[145.03368915,-37.84105741]]}]};
  
  
  console.log("DATA ARRIVED");
  console.log(data);
  var polylines = [];
  
    // console.log(str.rows[id].id);
    // console.log(str.rows[id].key);
    // console.log(str.rows[id].value);
    // console.log(str.rows[id].value[3][1]);

  // for (var key in str.rows){
  //   let lat1 = str.rows[key].value[3][1];
  //   let lng1 = str.rows[key].value[3][0];
  //   let lat2 = str.rows[key].value[4][1];
  //   let lng2 = str.rows[key].value[4][0];

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
    // console.log(polylines);  
  }
  // console.log("ABOVE IS INSIDE FOR LOOP");
  // console.log("BELOW IS OUTSIDE FOR LOOP");
  console.log(polylines.length);
  
  return polylines
  // console.log(str);
  // let formattedSpeeds = {};
  // console.log(data);
  // for (var speed in data){
  //  console.log(speed);
  // }
}

function testprocessSpeeds() {
  console.log("HELLO THIS IS A TEST");
}
//     let formattedSuburbs = {};
//     for (var suburb in data) {
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