// Import React Components
import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
import TwitterAnalytics from "./TwitterAnalytics.js"

injectTapEventPlugin();

class App extends Component {
  render() {
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
