//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   Header component, do display a title and some links at
//               the top of every screen.
//    Modified:  30/04/2017
//---------------------------- DESCRIPTION ----------------------------//

import React from 'react';
import AppBar from 'material-ui/AppBar';
import * as Constants from '../Constants.js';

import RaisedButton from 'material-ui/RaisedButton';
import IconGit from 'material-ui/svg-icons/file/cloud';
import IconYoutube from 'material-ui/svg-icons/av/play-arrow';

const GithubButton = () => (
    <RaisedButton
      href="https://github.com/at-white/CCC_project2"
      target="_blank"
      label="GitHub"
      primary={true}
      icon={<IconGit />}
    />
);

const YoutubeButton = () => (
    <RaisedButton
      href="https://youtu.be/-BL7-9NsJ4M"
      target="_blank"
      label="Demo"
      primary={true}
      icon={<IconYoutube />}
    />
);

const ElementRight = () => (
  <div>
    <GithubButton />
    <YoutubeButton />
  </div>
);

function Header(props) {
  var t = "Twitter Analytics"
  switch(props.title) {
    case Constants.SENTIMENT:
      t = "Where are the happiest Melbournians?"
      break;
    case Constants.SPEED:
      t = "Movement"
      break;
    case Constants.USER:
      t = "User Tracker"
      break;
    case Constants.LANGUAGE:
      t = "Languages"
      break;
    case Constants.GRAPHS:
      t = "Graphical Analysis"
      break;
    case Constants.AUTHORS:
      t = "About The Creators..."
      break;
     case Constants.HOME:
     default:
      t = "Twitter in Melbourne"
      break;
}

  return (
    <div>
      <AppBar
        title={t}
        showMenuIconButton={false}
        iconElementRight={<ElementRight />}
      />
    </div>
  );
}

export default Header;