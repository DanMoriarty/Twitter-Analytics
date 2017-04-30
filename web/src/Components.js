import React from 'react';
import AppBar from 'material-ui/AppBar';


function AppBarExampleIcon(props)  = () => (
  <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);


function Header(props) {
  return (
  	<AppBar
	    title={props.title}
	    iconClassNameRight="muidocs-icon-navigation-expand-more"
	  />
  );
}


export default Components;