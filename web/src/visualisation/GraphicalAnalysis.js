import React, { Component } from 'react';
import Loading from '../material/Loading.js';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SingleHistogram from './SingleHistogram.js';
import StackedBar from './StackedBar.js';
import TimeGraph from './TimeGraph.js';
import * as Constants from '../Constants.js';

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
        };

        this.selectSuburb = this.selectSuburb.bind(this);
        this.clearSuburb = this.clearSuburb.bind(this);
        this.toggleMTweetsZoom = this.toggleMTweetsZoom.bind(this);
    }

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
    }

    selectSuburb(chosenRequest, index) {
        if (index === -1 || this.state.selectedSuburbs.includes(chosenRequest))
            return null;

        this.setState({selectedSuburbs: this.state.selectedSuburbs.concat(chosenRequest)});
    }

    clearSuburb(chosenRequest, index) {
        this.setState({selectedSuburbs: []});
    }

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

        const halfPaperStyle = {
          width: (w/2),
          margin: '1%',
          textAlign: 'center',
          display: 'inline-block',
        };

        if (!this.props.active)
            return null;
        
        if (this.state.error)
            return (<p>&nbsp;Failed retrieving data. Please try refreshing the page.</p>);

        if (!this.state.suburbSentimentTime || !this.state.sentimentTime || !this.state.deviceSentiment)
            return (<Loading />);

        return (<div className="GraphPage">
                    <Paper style={paperStyle}>
                        <div>
                            <h3>Sentiment vs Time </h3>
                            <TimeGraph
                                series={["Melbourne Tweets"]}
                                data={this.state.sentimentTime}
                                X="Time of Day"
                                Y="Proportion of Positive Tweets"
                                width={paperStyle.width}
                                zoom = {this.state.zoomMelbTweets}
                            />
                            <RaisedButton label="Toggle Zoom" secondary={true} onTouchTap={this.toggleMTweetsZoom} />
                        </div>
                    </Paper>
                    
                    <Paper style={paperStyle}>
                        <div>
                            <h3>Sentiment vs Time (Suburbs)</h3>
                            <TimeGraph
                                series={this.state.selectedSuburbs}
                                data={this.state.suburbSentimentTime}
                                X="Time of Day"
                                Y="Proportion of Positive Tweets"
                                width={paperStyle.width}
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

                    <Paper style={halfPaperStyle}>
                        <div>
                            <h3>Sentiment by Tweet Source</h3>
                            <StackedBar
                                series={["Neutral", "Positive", "Negative"]}
                                data={ this.state.deviceSentiment }
                                X="Device"
                                Y="Number of Tweets"
                                width={halfPaperStyle.width}
                                stack={true}
                            />
                            <sub>Usernames</sub>
                        </div>
                    </Paper>
                </div>);
  }
}

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

function processDeviceSentiment(data) {
    console.log(data)
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

export default GraphicalAnalysis;