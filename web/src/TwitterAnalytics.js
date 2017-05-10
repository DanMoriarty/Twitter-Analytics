//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   Main controller for the app. State manages which "page"
//               is visible at any given time. Map components are only
//               mounted when their state is active. Non-map components
//               are loaded in the background.
//    Modified:  08/05/2017
//---------------------------- DESCRIPTION ----------------------------//

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
import User from "./visualisation/UserMovement.js"
import Language from "./visualisation/Language.js"

// Load polygon data for maps
import melbPolygons from "./visualisation/sa2_melb_full.json";

import * as Constants from './Constants.js';

class TwitterAnalytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: Constants.HOME,
    };

    this.setActiveView = this.setActiveView.bind(this);
  }
  
  // Update the state with a new active view 
  setActiveView(view) {
    this.setState({activeView: view});
  }

  render() {
    return (
      <div className="App">

          
          <Header title={this.state.activeView}/>          
          
          <Home active={this.state.activeView === Constants.HOME} />
          { 
            this.state.activeView === Constants.SENTIMENT &&
            <Sentiment
              active={this.state.activeView === Constants.SENTIMENT}
              melbPolygons={melbPolygons}
            />
          }

          <GraphicalAnalysis
            active={this.state.activeView === Constants.GRAPHS}
          />
          
          { 
            this.state.activeView === Constants.SPEED &&
            <Speed
              active={this.state.activeView === Constants.SPEED}
            />
          }

          { 
            this.state.activeView === Constants.USER &&
            <User
              active={this.state.activeView === Constants.USER}
            />
          }

          { 
            this.state.activeView === Constants.LANGUAGE &&
            <Language
              active={this.state.activeView === Constants.LANGUAGE}
              melbPolygons={melbPolygons}
            />
          }
          <AuthorCards active={this.state.activeView === Constants.AUTHORS} />
          
          <Navigation onClick={this.setActiveView} />

      </div>
    );
  }
}


export default TwitterAnalytics;
