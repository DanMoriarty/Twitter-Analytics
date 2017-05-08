import React, { Component } from 'react';

function Speed(props) {

	if (!props.active)
		return null;
	
	return <p>This is our speed page!</p>;
}

export default Speed;
