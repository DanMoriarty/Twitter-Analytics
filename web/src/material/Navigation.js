//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   A navigation bar that appears on the bottom of every 
//               screen that controls application flow.
//    Modified:  1/05/2017
//---------------------------- DESCRIPTION ----------------------------//

import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

// Import SVG Icons
import IconHome from 'material-ui/svg-icons/action/home';
import IconSentiment from 'material-ui/svg-icons/image/tag-faces';
import IconSpeed from 'material-ui/svg-icons/maps/directions-run';
import IconGraph from 'material-ui/svg-icons/action/assessment';
import IconLanguage from 'material-ui/svg-icons/action/language';
import IconFace from 'material-ui/svg-icons/action/face';
import IconUser from 'material-ui/svg-icons/action/accessibility';

// Import Constants
import * as Constants from '../Constants.js';

const homeIcon = <IconHome />;
const graphIcon = <IconGraph />;
const sentimentIcon = <IconSentiment />;
const speedIcon = <IconSpeed />;
const langIcon = <IconLanguage />;
const faceIcon = <IconFace />;
const userIcon = <IconUser />;


class Navigation extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  select(index, clicked, onClick) {
    this.setState({selectedIndex: index});
    onClick(clicked);
  }

  render() {
    return (
      <div className="footer scrollmenu">
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Home"
              icon={homeIcon}
              onTouchTap={() => this.select(0, Constants.HOME, this.props.onClick)}
            />
            <BottomNavigationItem
              label="Sentiment"
              icon={sentimentIcon}
              onTouchTap={() => this.select(1, Constants.SENTIMENT, this.props.onClick)}
            />
            <BottomNavigationItem
              label="Sentiment Analysis"
              icon={graphIcon}
              onTouchTap={() => this.select(2, Constants.GRAPHS, this.props.onClick)}
            />
            <BottomNavigationItem
              label="Movement"
              icon={speedIcon}
              onTouchTap={() => this.select(3, Constants.SPEED, this.props.onClick)}
            />
            <BottomNavigationItem
              label="User Tracker"
              icon={userIcon}
              onTouchTap={() => this.select(4, Constants.USER, this.props.onClick)}
            />
            <BottomNavigationItem
              label="Language"
              icon={langIcon}
              onTouchTap={() => this.select(5, Constants.LANGUAGE, this.props.onClick)}
            />
            <BottomNavigationItem
              label="Creators"
              icon={faceIcon}
              onTouchTap={() => this.select(6, Constants.AUTHORS, this.props.onClick)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

export default Navigation;