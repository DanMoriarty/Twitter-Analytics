import React, { Component } from 'react';
import MovementMap from "./MovementMap.js";


class Speed extends Component{
	constructor(props) {
		super(props);

		
	}
	render()
	{
	if (!this.props.active) return null;
	
	return(
		<MovementMap/>
		)
	}
}


export default Speed;