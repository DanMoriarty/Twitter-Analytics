import React, { Component } from 'react';
import Speedmap from './Speedmap.js';

function Speed(props) {

	if (!props.active)
		return null;

	return (<div>
		<p>This is our speed page!</p>
			<div className="container">
        		<div className="left">
          			<Speedmap suburbs={props.suburbs}/>
        		</div>
			</div>
		</div>);
}

export default Speed;
