import React, { Component } from 'react';
import InfoCard from '../material/InfoCard.js'
import GChoropleth from './GChoropleth.js'
import * as Constants from '../Constants.js';
import ListBox from '../material/ListBox.js';

class Sentiment extends Component {
  constructor(props) {
    super(props);
    this.state = {suburbSentiment: null};
    this.updatePolys = this.updatePolys.bind(this);
  }

  componentDidMount() {
    fetch(Constants.APIPATH + 'suburbSentiment', Constants.INIT)
      .then(result=>result.json()) 
      .then(items=> {
        let sents = processSentiments(items.rows)
        this.setState({suburbSentiment: sents.slice(0, 3), polyInfo: sents[3]});
      })
      .catch(error => this.setState({error: true}))
  }

  updatePolys(update) {
    this.setState({polyInfo: update});
  }

  render() {
    if (!this.props.active) return null;

    let posRatioSuburbs = null,
        topTweets = null,
        topPos = null,
        topNeg = null,
        topNeu = null,
        limit   = 5;

    if (this.state.suburbSentiment) {
      let top = this.state.suburbSentiment[0],
          pos = this.state.suburbSentiment[1],
          neu = this.state.suburbSentiment[2];

      topPos = formatSentimentalList(pos.slice(-1 * limit).reverse());
      topNeg = formatSentimentalList(pos.slice(0, limit));
      topNeu = formatNeutralList(neu.slice(-1 * limit).reverse());
      topTweets = formatTopList(top.slice(-1 * limit).reverse());

    }

    return (
      <div className="container">
        <div className="left">
          <GChoropleth
            data={this.state.polyInfo ? this.state.polyInfo : null}
            melbPolygons={this.props.melbPolygons}
            updatePolys={this.updatePolys}
          />
        </div>
        <div className="right">
          <ListBox 
            title="Most Tweets"
            subtitle="Highest total number of tweets"
            items={topTweets}
          />
          <ListBox 
            title="Happiest Suburbs"
            subtitle="Highest ratio of positive sentimental tweets"
            items={topPos}
          />
          <ListBox 
            title="Unhappiest Suburbs"
            subtitle="Lowest ratio of positive sentimental tweets"
            items={topNeg}
          />
          <ListBox 
            title="Most Neutral Suburbs"
            subtitle="Highest ratio of neutral tweets"
            items={topNeu}
          />
        </div>
      </div>

      );
  }
}

function processSentiments(suburbSentiment) {
  // Process sentiment counts into the format expected by the 
  // Google Maps choropleth, and share the computation with
  // soting tweets by their positivity / neutrality
  const minTweets = 100;

  let processedSents = {},
      topPos = [],
      topNeu = [],
      topTweet = [];

  for (var key in suburbSentiment) {
    if (!key || !suburbSentiment.hasOwnProperty(key))
      continue

    let obj = suburbSentiment[key],
        suburb = obj.key,
        pos = obj.value['1'],
        neu = obj.value['0'],
        neg = obj.value['-1'];

    if (!suburb || suburb == "None")
      continue

    let posR = pos > 0 || neg > 0 ? pos / (pos + neg) : 0,
        neuR = pos > 0 || neg > 0 || neu > 0 ? neu / (pos + neg + neu) : 0;
    
    if ((pos + neg) > minTweets) {
      topPos.push([suburb, posR, {pos: pos, neu: neu, neg: neg}]);
      topNeu.push([suburb, neuR, {pos: pos, neu: neu, neg: neg}]);
      topTweet.push([suburb, pos+neg+neu, {pos: pos, neu: neu, neg: neg}])
    }

    processedSents[suburb] = {data: posR, info: `Positive: ${pos}. Negative: ${neg}. Neutral: ${neu}.`, showInfo: false};
  }

  return [topTweet.sort((a, b) => a[1] - b[1]), topPos.sort((a, b) => a[1] - b[1]), topNeu.sort((a, b) => a[1] - b[1]), processedSents];
}

function formatSentimentalList(arrSlice) {
  let formatted = [];
  for (var i in arrSlice) {
    let item = arrSlice[i];
    formatted.push(
      {Suburb: item[0],  "Sentimental Tweets": (item[2].pos + item[2].neg), Positive: `${(item[1] * 100).toFixed(2)}%`}
    );
  }
  return formatted;
}

function formatNeutralList(arrSlice) {
  let formatted = [];
  for (var i in arrSlice) {
    let item = arrSlice[i];
    formatted.push(
      {Suburb: item[0],  "Total Tweets": (item[2].pos + item[2].neg + item[2].neu), Neutrality: `${(item[1] * 100).toFixed(2)}%`}
    );
  }
  return formatted;
}

function formatTopList(arrSlice) {
  let formatted = [];
  for (var i in arrSlice) {
    let item = arrSlice[i];
    formatted.push(
      {Suburb: item[0],  "Total Tweets": (item[2].pos + item[2].neg + item[2].neu)}
    );
  }
  return formatted;
}

export default Sentiment;