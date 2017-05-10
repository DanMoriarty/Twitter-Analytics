//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   Wrapper component for the MovementMap component.
//    Modified:  07/05/2017
//---------------------------- DESCRIPTION ----------------------------//

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