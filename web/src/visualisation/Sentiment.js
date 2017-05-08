import React, { Component } from 'react';
import InfoCard from '../material/InfoCard.js'
import GChoropleth from './GChoropleth.js'
import * as Constants from '../Constants.js';

class Sentiment extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.placeholderData = 
    [
      {suburb:"Parkville", data: "20.00% Positive (Pos: 20, Neg: 80)"},
      {suburb:"Melbourne", data: "98.03% Positive (Pos: 100, Neg: 2)"}
    ]
  }

  componentDidMount() {
    fetch('http://localhost:4444/api/suburbSentiment', Constants.INIT)
      .then(result=>result.json()) 
      .then(items=> this.setState({suburbSentiment: items.rows}))
      .catch(error => this.setState({error: true}))
  }

  render() {
    if (!this.props.active) return null;

    return (
      <div className="container">
        <div className="left">
          <GChoropleth
            data={this.state.suburbSentiment}
            melbPolygons={this.props.melbPolygons}
          />
        </div>
        <div className="right">
          <InfoCard
            title="Happiest Suburbs"
            subtitle="Highest ratio of positive tweets"
            items={this.placeholderData}
          />
          <InfoCard
            title="Unhappiest Suburbs"
            subtitle="Highest ratio of negative tweets"
            items={this.placeholderData}
          />
          <InfoCard
            title="Neutral Suburbs"
            subtitle="Highest ratio of neutral tweets"
            items={this.placeholderData}
          />
          <InfoCard
            title="Controversial Suburbs"
            subtitle="Most mixed ratio of postive/negative tweets"
            items={this.placeholderData}
          />
        </div>
      </div>

      );
  }
}

export default Sentiment;