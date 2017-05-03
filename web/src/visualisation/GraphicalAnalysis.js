import React, { Component } from 'react';
import Loading from '../material/Loading.js';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SingleHistogram from './SingleHistogram.js'
import TimeGraph from './TimeGraph.js'
import * as Constants from '../Constants.js'

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

        fetch('http://localhost:4444/api/suburbSentimentTime', Constants.INIT)
            .then(result=>result.json()) 
            .then(items=> this.setState({suburbSentimentTime: processSuburbTimes(items.rows), error:false}))
            .catch(error => this.setState({error: true}))

        fetch('http://localhost:4444/api/sentimentTime', Constants.INIT)
            .then(result=>result.json()) 
            .then(items=> this.setState({sentimentTime: processSuburbTimes(items.rows), error:false}))
            .catch(error => this.setState({error: true}))
        
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

    if (!this.props.active)
        return null;
    
    if (this.state.error)
        return (<p>&nbsp;Failed retrieving data. Please try refreshing the page.</p>);

    if (!this.props.suburbSentiment || !this.state.suburbSentimentTime || !!this.state.suburbSentiment)
        return (<Loading />);


    console.log(this.state.sentimentTime)

    const tweetsPerSuburb = this.props.suburbSentiment.slice(0,10).map(
        item => ({x: item.key, y: item.value["1"]}));

    const allSuburbs = this.props.suburbSentiment.map(
        item => (item.key));

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
                            dataSource={ allSuburbs }
                            maxSearchResults={ 5 }
                            onNewRequest={ this.selectSuburb }
                        />
                        <RaisedButton label="Clear All" secondary={true} onTouchTap={this.clearSuburb} />
                    </div>
                </Paper>

                <Paper style={paperStyle}>
                    <div>
                        <h3>Number of Positive Tweets</h3>
                        <SingleHistogram
                            data={tweetsPerSuburb}
                            Y="Number of Tweets"
                            width={paperStyle.width}
                        />
                        <sub>Usernames</sub>
                    </div>
                </Paper>

            </div>);
  }
}

function processSuburbTimes(data) {
    let formattedSuburbs = {};
    for (var suburb in data) {
        let suburbName = data[suburb].key;
        let vals = data[suburb].value;
        let suburbArr = []
        for (var time in vals) {
            let formattedTime = time.length > 1 ? time + ":00" : "0" + time + ":00" 
            if (vals.hasOwnProperty(Number(time)) && (vals[Number(time)]["1"] > 0 || vals[Number(time)]["-1"] > 0)) {
                suburbArr.push({x: formattedTime, y: vals[Number(time)]["1"] / (vals[Number(time)]["1"] + vals[Number(time)]["-1"])});
            } 
        }

        if (suburbName != null) {
            formattedSuburbs[suburbName] = suburbArr;
        } else {
            formattedSuburbs["Melbourne Tweets"] = suburbArr;
        }
    }
    return formattedSuburbs;
}

export default GraphicalAnalysis;