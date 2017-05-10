//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   "Loading screen" component
//    Modified:  30/04/2017
//---------------------------- DESCRIPTION ----------------------------//

import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => (
	<div>
		<LinearProgress mode="indeterminate" color="#E91E63"/>
		<br/><br/>
		<div className="centered">
			<CircularProgress size={80} thickness={5} color="#E91E63" />
		</div>
	</div>
);

export default Loading;