//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   Wrapper component for a user movement map.
//    Modified:  08/05/2017
//---------------------------- DESCRIPTION ----------------------------//

import React, { Component } from 'react';
import UserMovementMap from "./UserMovementMap.js";


class UserSpeed extends Component{
	constructor(props) {
		super(props);
	}
	
	render()
	{
	if (!this.props.active) return null;
	
	return(
		<UserMovementMap/>
		)
	}
}


export default UserSpeed;