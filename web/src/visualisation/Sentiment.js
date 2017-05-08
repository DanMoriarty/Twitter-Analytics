import React, { Component } from 'react';
import InfoCard from '../material/InfoCard.js'
import GChoropleth from './GChoropleth.js'
import * as Constants from '../Constants.js';
import ListBox from '../material/ListBox.js';

class Sentiment extends Component {
  constructor(props) {
    super(props);
    this.state = {suburbSentiment: null};

    this.placeholderData = 
    [
      {suburb:"Parkville", data: "20.00% Positive (Pos: 20, Neg: 80)"},
      {suburb:"Melbourne", data: "98.03% Positive (Pos: 100, Neg: 2)"}
    ]
  }

  componentDidMount() {
    fetch('http://localhost:4444/api/suburbSentiment', Constants.INIT)
      .then(result=>result.json()) 
      .then(items=> this.setState({suburbSentiment: items.rows, sortedSentiment: processSentiments(items.rows)}))
      .catch(error => this.setState({error: true}))
  }

  render() {
    if (!this.props.active) return null;

    let topPos = null,
        topNeg = null,
        topNeu = null;

    if (this.state.sortedSentiment) {
      let pos = this.state.sortedSentiment[0],
          neu = this.state.sortedSentiment[1];

      topPos = formatSentimental(pos.slice(-3).reverse());
      topNeg = formatSentimental(pos.slice(0, 3));
      topNeu = formatNeutral(neu.slice(-3).reverse());

    }

    return (
      <div className="container">
        <div className="left">
          <GChoropleth
            data={this.state.suburbSentiment}
            melbPolygons={this.props.melbPolygons}
          />
        </div>
        <div className="right">
          <ListBox 
            title="Happiest Suburbs"
            subtitle="Highest ratio of positive tweets"
            columnTitle="Suburb"
            items={topPos}
          />
          <InfoCard
            title="Happiest Suburbs"
            subtitle="Highest ratio of positive tweets"
            items={topPos}
          />
          <InfoCard
            title="Unhappiest Suburbs"
            subtitle="Highest ratio of negative tweets"
            items={topNeg}
          />
          <InfoCard
            title="Neutral Suburbs"
            subtitle="Highest ratio of neutral tweets"
            items={topNeu}
          />
        </div>
      </div>

      );
  }
}

function processSentiments(suburbSentiment) {
  // Sort tweets by their positivity / neutrality
  const minTweets = 100;

  let topPos = [],
      topNeu = [];

  for (var key in suburbSentiment) {
    if (!key || !suburbSentiment.hasOwnProperty(key))
      continue

    let obj = suburbSentiment[key],
        suburb = obj.key,
        pos = obj.value['1'],
        neu = obj.value['0'],
        neg = obj.value['-1'];

    let posR = pos > 0 || neg > 0 ? pos / (pos + neg) : 0,
        neuR = pos > 0 || neg > 0 || neu > 0 ? neu / (pos + neg + neu) : 0;
    
    if ((pos + neg) > minTweets) {
      topPos.push([suburb, posR, {pos: pos, neu: neu, neg: neg}]);
      topNeu.push([suburb, neuR, {pos: pos, neu: neu, neg: neg}]);
    }
  }

  return [topPos.sort((a, b) => a[1] - b[1]), topNeu.sort((a, b) => a[1] - b[1])];
}

function formatSentimental(arrSlice) {
  let formatted = [];
  for (var i in arrSlice) {
    let item = arrSlice[i];
    formatted.push(
      item[0]
      // {suburb: item[0], data: `${(item[1] * 100).toFixed(2)}% Positive (${item[2].pos}+, ${item[2].neg}-)`}
    );
  }
  return formatted;
}

function formatNeutral(arrSlice) {
  let formatted = [];
  for (var i in arrSlice) {
    let item = arrSlice[i];
    formatted.push(
      {suburb: item[0], data: `${(item[1] * 100).toFixed(2)}% Neutral (${item[2].pos}+, ${item[2].neg}-, ${item[2].neu}*)`}

    );
  }
  return formatted;
}

export default Sentiment;