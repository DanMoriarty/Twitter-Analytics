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