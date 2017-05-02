import React, { Component } from 'react';
import Loading from '../material/Loading.js';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Card';
import SingleHistogram from './SingleHistogram.js'
import TimeGraph from './TimeGraph.js'
import * as Constants from '../Constants.js'

class GraphicalAnalysis extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            suburbSentiment: null,
            suburbSentimentTime: null,
            error: false,
            width: '0',
            height: '0'
        };

        this.selectSuburb = this.selectSuburb.bind(this);
    }

    componentDidMount() {
        this.setState({height:window.innerHeight, width: window.innerWidth})

        fetch('http://localhost:4444/api/suburbSentimentTime', Constants.INIT)
            .then(result=>result.json()) 
            .then(items=> this.setState({suburbSentimentTime: items.rows, error:false}))
            .catch(error => this.setState({error: true}))
    }

  selectSuburb(chosenRequest, index) {
    if (index === -1)
        return null;

    console.log("Clicked " + chosenRequest);
  }

    render() {
    // Set width for each graph element
    const   minWidth = 350,
            dynamicWidth = (Number(this.state.width) * 0.46).toFixed(0),
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
        return (<p>    Failed retrieving data. Please try refreshing the page.</p>);

    if (!this.props.suburbSentiment)
        return (<Loading />);

    const tweetsPerSuburb = this.props.suburbSentiment.slice(0,10).map(
        item => ({x: item.key, y: item.value["1"]}));

    const allSuburbs = this.props.suburbSentiment.map(
        item => (item.key));

    
    
    // PLACEHOLDER times
    const placeholder_times = 
        [
            {x: "00:00", y: 3},
            {x: "01:00", y: 3},
            {x: "02:00", y: 3},
            {x: "03:00", y: 3},
            {x: "04:00", y: 3},
            {x: "05:00", y: 5},
            {x: "06:00", y: 15},
            {x: "07:00", y: 12},
            {x: "08:00", y: 7},
            {x: "09:00", y: 9},
            {x: "10:00", y: 15},
            {x: "11:00", y: 16},
            {x: "12:00", y: 17},
            {x: "13:00", y: 18},
            {x: "14:00", y: 19},
            {x: "15:00", y: 19},
            {x: "16:00", y: 19},
            {x: "17:00", y: 25},
            {x: "18:00", y: 27},
            {x: "19:00", y: 20},
            {x: "20:00", y: 15},
            {x: "21:00", y: 12},
            {x: "22:00", y: 8},
            {x: "23:00", y: 6},
            {x: "24:00", y: 3}
        ]
    
    return (<div className="GraphPage">
                <Paper style={paperStyle}>
                    <div>
                        <h3>Sentiment vs Time</h3>
                        <TimeGraph
                            data={ placeholder_times }
                            Y="Percent of Positive Tweets"
                            width={paperStyle.width}
                        />
                        <sub>Time of Day</sub>
                    </div>
                </Paper>

                <Paper style={paperStyle}>
                    <div>
                        <h3>Sentiment vs Time (Suburbs)</h3>
                        <TimeGraph
                            data={ placeholder_times }
                            Y="Percent of Positive Tweets"
                            width={paperStyle.width}
                        />
                        <sub>Time of Day</sub><br/>
                        <AutoComplete
                            floatingLabelText="Suburb 1"
                            filter={ AutoComplete.caseInsensitiveFilter }
                            dataSource={ allSuburbs }
                            maxSearchResults={ 5 }
                            onNewRequest={ this.selectSuburb }
                        />
                        &nbsp;&nbsp;&nbsp;
                        <AutoComplete
                            floatingLabelText="Suburb 2"
                            filter={ AutoComplete.caseInsensitiveFilter }
                            dataSource={ allSuburbs }
                            maxSearchResults={ 5 }
                            onNewRequest={ this.selectSuburb }
                        />
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

export default GraphicalAnalysis;