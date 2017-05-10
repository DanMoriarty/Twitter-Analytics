//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   A page to manage all the sentiment-related graphs.
//               Implements each kind of graph component we wrote.
//    Purpose:   App Container
//    Modified:  11/05/2017
//---------------------------- DESCRIPTION ----------------------------//

import React, { Component } from 'react';
import Loading from '../material/Loading.js';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SingleHistogram from './SingleHistogram.js';
import StackedBar from './StackedBar.js';
import TimeGraph from './TimeGraph.js';
import * as Constants from '../Constants.js';
import cloneDeep from "lodash";

// pre-processed json containing 4 AURIN socioeconomic datasets
import AURIN from "./AURIN.json";

// headers for the AURIN datasets
const headers = ["Qualification", "OECD Indicators", "Advantage", "Learning or Earning"];


// Retrive data from the API and display relevant graph components for each.
class GraphicalAnalysis extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            suburbSentimentTime: null,
            sentimentTime: null,
            selectedSuburbs: [],
            error: false,
            width: '0',
            height: '0',
            zoomMelbTweets: false,
            selectedAurin: headers[0],
        };

        this.selectSuburb = this.selectSuburb.bind(this);
        this.clearSuburb = this.clearSuburb.bind(this);
        this.toggleMTweetsZoom = this.toggleMTweetsZoom.bind(this);
        this.selectAurin = this.selectAurin.bind(this);
    }

    // Fetch each piece of data from the API
    componentDidMount() {
        this.setState({height:window.innerHeight, width: window.innerWidth})

        fetch(Constants.APIPATH + 'suburbSentimentTime', Constants.INIT)
            .then(result=>result.json()) 
            .then(items=> this.setState({suburbSentimentTime: processSuburbTimes(items.rows)}))
            .catch(error => console.log(error))

        fetch(Constants.APIPATH + 'sentimentTime', Constants.INIT)
            .then(result=>result.json()) 
            .then(items=> this.setState({sentimentTime: processSuburbTimes(items.rows, true)}))
            .catch(error => console.log(error))     

        fetch(Constants.APIPATH + 'deviceSentiment', Constants.INIT)
            .then(result=>result.json()) 
            .then(items=> this.setState({deviceSentiment: processDeviceSentiment(items.rows, true)}))
            .catch(error => console.log(error))     

        fetch(Constants.APIPATH + 'suburbSentiment', Constants.INIT)
          .then(result=>result.json()) 
          .then(items=> this.setState({suburbSentiment: correlateAURIN(items.rows)}))
          .catch(error => console.log(error))
    }

    // add suburbs to the "selected" list for the sentiment vs time (suburbs) graph
    selectSuburb(chosenRequest, index) {
        if (index === -1 || this.state.selectedSuburbs.includes(chosenRequest))
            return null;

        this.setState({selectedSuburbs: this.state.selectedSuburbs.concat(chosenRequest)});
    }

    // select an aurin data set
    selectAurin(value) {
      this.setState({selectedAurin: value});
    }

    // remove all suburbs from the suburb list
    clearSuburb(chosenRequest, index) {
        this.setState({selectedSuburbs: []});
    }

    // zoom in / out on the sentiment vs time graph
    toggleMTweetsZoom() {
        this.setState({zoomMelbTweets: !this.state.zoomMelbTweets});
    }

    render() {
        // Set width for each graph element
        const   minWidth = 350,
                dynamicWidth = (Number(this.state.width) * 0.96).toFixed(0),
                w = dynamicWidth > minWidth ? dynamicWidth : Number(this.state.width);
        
        // Set style for paper wrappers
        const paperStyle = {
          width: w,
          margin: '1%',
          textAlign: 'center',
          display: 'inline-block',
        };

        // Don't display the page if it isn't "active" (has been clicked on)
        if (!this.props.active)
            return null;
        
        // Display an error if one was found
        if (this.state.error)
            return (<p>&nbsp;Failed retrieving data. Please try refreshing the page.</p>);

        // Return a loading screen until all data has arrived
        if (!this.state.suburbSentimentTime || !this.state.sentimentTime || !this.state.deviceSentiment || !this.state.suburbSentiment)
            return (<Loading />);

        // Display the graphs
        return (<div className="GraphPage">
                    <Paper style={paperStyle}>
                        <div>
                            <h3>Tweet Sentiment vs Time </h3>
                            <TimeGraph
                                series={["Melbourne Tweets"]}
                                data={this.state.sentimentTime}
                                X="Time of Day"
                                Y="Proportion of Positive Tweets"
                                width={paperStyle.width}
                                zoom = {this.state.zoomMelbTweets}
                                xType={"ordinal"}
                                lines={true}
                            />
                            <RaisedButton label="Toggle Zoom" secondary={true} onTouchTap={this.toggleMTweetsZoom} />
                        </div>
                    </Paper>
                    
                    <Paper style={paperStyle}>
                        <div>
                            <h3>Tweet Sentiment vs Time (Suburbs)</h3>
                            <TimeGraph
                                series={this.state.selectedSuburbs}
                                data={this.state.suburbSentimentTime}
                                X="Time of Day"
                                Y="Proportion of Positive Tweets"
                                width={paperStyle.width}
                                xType={"ordinal"}
                                lines={true}
                            />
                            <AutoComplete
                                floatingLabelText="Add Suburb"
                                filter={ AutoComplete.caseInsensitiveFilter }
                                dataSource={ Object.keys(this.state.suburbSentimentTime) }
                                maxSearchResults={ 5 }
                                onNewRequest={ this.selectSuburb }
                            />
                            <RaisedButton label="Clear All" secondary={true} onTouchTap={this.clearSuburb} />
                        </div>
                    </Paper>

                    <Paper style={paperStyle}>
                        <div>
                            <h3>Sentiment by Tweet Source</h3>
                            <StackedBar
                                series={["Neutral", "Positive", "Negative"]}
                                data={ this.state.deviceSentiment }
                                X="Device"
                                Y="Percentage of Tweets"
                                width={paperStyle.width}
                                stack={true}
                            />
                        </div>
                    </Paper>

                    <div id="bottomPaper">
                      <Paper style={paperStyle}>
                          <div>
                              <h3>AURIN Data vs Tweet Sentiment </h3>
                              <TimeGraph
                                  series={[this.state.selectedAurin]}
                                  data={this.state.suburbSentiment}
                                  X={this.state.selectedAurin}
                                  Y="Proportion of Positive Tweets"
                                  width={paperStyle.width}
                                  zoom={true}
                                  sentiments={true}
                              />
                              <h4>Select Dataset:</h4>
                              <RaisedButton
                                label={headers[0]}
                                secondary={true}
                                onTouchTap={() => this.selectAurin(headers[0])}
                                style={{margin: '5px'}}
                              />
                              <RaisedButton
                                label={headers[1]}
                                secondary={true}
                                onTouchTap={() => this.selectAurin(headers[1])}
                                style={{margin: '5px'}}
                              />
                              <RaisedButton
                                label={headers[2]}
                                secondary={true}
                                onTouchTap={() => this.selectAurin(headers[2])}
                                style={{margin: '5px'}}
                              />
                              <RaisedButton
                                label={headers[3]}
                                secondary={true}
                                onTouchTap={() => this.selectAurin(headers[3])}
                                style={{margin: '5px'}}
                              />
                          </div>
                      </Paper>
                    </div>

                </div>);
  }
}

// process the suburb time data into the format required by the graphing components
function processSuburbTimes(data, allMelbourne = false) {
    let formattedSuburbs = {};
    for (var suburb in data) {
        if (!suburb || !data.hasOwnProperty(suburb) || data[suburb].key == "None")
            continue

        let suburbName = data[suburb].key;
        let vals = data[suburb].value;
        let suburbArr = []
        for (var time in vals) {
            let formattedTime = time.length > 1 ? time + ":00" : "0" + time + ":00" 
            if (vals.hasOwnProperty(Number(time)) && (vals[Number(time)]["1"] > 0 || vals[Number(time)]["-1"] > 0)) {
                suburbArr.push({x: formattedTime, y: vals[Number(time)]["1"] / (vals[Number(time)]["1"] + vals[Number(time)]["-1"])});
            } 
        }

        if (allMelbourne) {
            formattedSuburbs["Melbourne Tweets"] = suburbArr;
        } else {
            formattedSuburbs[suburbName] = suburbArr;
        }
    }
    return formattedSuburbs;
}

// process the device sentiment data into the format required by the graphing components
function processDeviceSentiment(data) {
    let devicesCounts = {};
    let pos = [],
        neg = [],
        neu = [];

    // Sum totals for each device
    for (var d in data) {
        let device = data[d].key[0];
        let sent = data[d].key[1];
        
        if (!devicesCounts.hasOwnProperty(device)) {
            devicesCounts[device] = 0
        }

        devicesCounts[device] +=  data[d].value        
    }

    // Structure data for stacked bar component 
    for (var d in data) {
        let device = data[d].key[0];
        let sent = data[d].key[1];

        if (sent === 1) {
            pos.push({x: device, y: (data[d].value / devicesCounts[device]) * 100 })
        } else if (sent === 0) {
            neu.push({x: device, y: (data[d].value / devicesCounts[device]) * 100 })
        } else if (sent === -1) {
            neg.push({x: device, y: (data[d].value / devicesCounts[device]) * 100 })
        }  
    }

    return {"Positive": pos, "Negative": neg, "Neutral": neu};
}

// process the suburb data alongside the AURIN data
function correlateAURIN(data) {
  let processed = {};
  
  for (var j in headers) {
    let thisField = [];
    for (var i in data) {
      let obj = data[i],
          suburb = obj.key,
          pos = obj.value['1'],
          neg = obj.value['-1'];

      if (!suburb || suburb == "None")
        continue

      let posR = pos > 0 || neg > 0 ? pos / (pos + neg) : 0;

      if (AURIN.hasOwnProperty(suburb))
        thisField.push({x: AURIN[suburb][j], y: posR})
    }

    processed[headers[j]] = thisField
  }

  console.log("correlated")
  return processed;
}

export default GraphicalAnalysis;