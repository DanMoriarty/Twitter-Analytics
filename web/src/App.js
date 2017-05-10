//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   App Container
//    Modified:  30/04/2017
//---------------------------- DESCRIPTION ----------------------------//

// Import React Components
import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
import TwitterAnalytics from "./TwitterAnalytics.js"

injectTapEventPlugin();

class App extends Component {
  render() {
  	console.ignoredYellowBox = ['Warning:'];
    return (
      <div className="App">
          <MuiThemeProvider>
            <TwitterAnalytics />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
