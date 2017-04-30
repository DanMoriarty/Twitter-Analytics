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

import * as Constants from './Constants.js';

class TwitterAnalytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: Constants.HOME,
    };

    this.setActiveView = this.setActiveView.bind(this);
  }

  setActiveView(view) {
    this.setState({activeView: view});
  }

  render() {
    return (
      <div className="App">
          <div className="center">
            <Header title={this.state.activeView}/>
          </div>
          
          <Sentiment active={this.state.activeView == Constants.SENTIMENT} />
          <Home active={this.state.activeView == Constants.HOME} />
          <AuthorCards active={this.state.activeView == Constants.AUTHORS} />

        <Navigation onClick={this.setActiveView} />
      </div>
    );
  }
}


export default TwitterAnalytics;
