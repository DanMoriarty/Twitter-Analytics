// Import React Components
import React, { Component } from 'react';
import './App.css';

// Import Design Components
import Header from "./material/Header.js"
import Navigation from "./material/Navigation.js"
import Home from "./material/Home.js"
import AuthorCards from "./material/AuthorCards.js"

// Import Visualisation Components
import Sentiment from "./visualisation/Sentiment.js"
import GraphicalAnalysis from "./visualisation/GraphicalAnalysis.js"
import Speed from "./visualisation/Movement.js"
import Language from "./visualisation/Language.js"

// Load polygon data for maps
import melbPolygons from "./visualisation/sa2_melb_full.json";

import * as Constants from './Constants.js';

class TwitterAnalytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: Constants.HOME,
      suburbSentiment: null,
    };

    this.setActiveView = this.setActiveView.bind(this);
  }
  
  setActiveView(view) {
    this.setState({activeView: view});
  }

  render() {
    return (
      <div className="App">

          
          <Header title={this.state.activeView}/>          
          
          <Home active={this.state.activeView === Constants.HOME} />
          <Sentiment
            active={this.state.activeView === Constants.SENTIMENT}
            suburbs={this.state.suburbSentiment} 
            melbPolygons={melbPolygons}
          />
          <GraphicalAnalysis
            active={this.state.activeView === Constants.GRAPHS}
            suburbSentiment={this.state.suburbSentiment}
          />
          <Speed
            active={this.state.activeView === Constants.SPEED}
          />
          <Language
            active={this.state.activeView === Constants.LANGUAGE}
            melbPolygons={melbPolygons}
          />
          <AuthorCards active={this.state.activeView === Constants.AUTHORS} />
          
          <Navigation onClick={this.setActiveView} />

      </div>
    );
  }
}


export default TwitterAnalytics;
