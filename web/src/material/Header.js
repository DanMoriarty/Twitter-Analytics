import React from 'react';
import AppBar from 'material-ui/AppBar';
import * as Constants from '../Constants.js';

import RaisedButton from 'material-ui/RaisedButton';
import IconGit from 'material-ui/svg-icons/file/cloud';

const GitIcon = <IconGit />

const GithubButton = () => (
    <RaisedButton
      href="https://github.com/at-white/CCC_project2"
      target="_blank"
      label="GitHub"
      primary={true}
      icon={<IconGit />}
    />
);


function Header(props) {
  var t = "Twitter Analytics"
  switch(props.title) {
    case Constants.HOME:
      t = "Twitter in Melbourne"
      break;
    case Constants.SENTIMENT:
      t = "Where are the happiest Melbournians?"
      break;
    case Constants.SPEED:
      t = "Speeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed!"
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
}

  return (
    <div className="center">
      <AppBar
        title={t}
        showMenuIconButton={false}
        iconElementRight={<GithubButton />}
      />
    </div>
  );
}

export default Header;