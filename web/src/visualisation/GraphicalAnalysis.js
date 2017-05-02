import React, { Component } from 'react';
import Loading from '../material/Loading.js';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Card';
import SingleHistogram from './SingleHistogram.js'
import TimeGraph from './TimeGraph.js'

class GraphicalAnalysis extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        items: null,
        error: false,
        width: '0',
        height: '0'
    };
  }

  componentDidMount() {
    this.setState({height:window.innerHeight, width: window.innerWidth})

    // Load Data from the API
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default' };
    fetch('http://localhost:4444/api/userTweets', myInit)
        .then(result=>result.json()) 
        .then(items=> this.setState({items: items.rows, error:false}))
        .catch(error => this.setState({error: true}))
  }

  render() {
    const   minWidth = 350,
            dynamicWidth = (Number(this.state.width) * 0.46).toFixed(0),
            w = dynamicWidth > minWidth ? dynamicWidth : Number(this.state.width);
    
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

    if (!this.state.items)
        return (<Loading />);

    const tweetsPerUser = this.state.items.map(
        item => ({x: item.key, y: item.value}));

    const allUsers = this.state.items.map(
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
                        <sub>Time of Day</sub>
                        <AutoComplete
                            floatingLabelText="Suburb 1"
                            filter={ AutoComplete.fuzzyFilter }
                            dataSource={ allUsers }
                            maxSearchResults={ 5 }
                        />
                        &nbsp&nbsp&nbsp
                        <AutoComplete
                            floatingLabelText="Suburb 2"
                            filter={ AutoComplete.fuzzyFilter }
                            dataSource={ allUsers }
                            maxSearchResults={ 5 }
                        />
                    </div>
                </Paper>

                <Paper style={paperStyle}>
                    <div>
                        <h3>Number of Tweets Per User</h3>
                        <SingleHistogram
                            data={tweetsPerUser}
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