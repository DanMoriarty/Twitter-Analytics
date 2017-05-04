import React, { Component } from 'react';
import {
    XYPlot, 
    XAxis, 
    YAxis, 
    VerticalGridLines, 
    HorizontalGridLines,  
    LineSeries,
    MarkSeries,
    DiscreteColorLegend
} from 'react-vis';
import * as Constants from '../Constants.js'

class TimeGraph extends Component {
    constructor(props) {
        super(props);

        this.placeholder_times = 
        [
            {x: "00:00", y: 0},
            {x: "01:00", y: 1},
            {x: "02:00", y: 1},
            {x: "03:00", y: 1},
            {x: "04:00", y: 1},
            {x: "05:00", y: 1},
            {x: "06:00", y: 1},
            {x: "07:00", y: 1},
            {x: "08:00", y: 1},
            {x: "09:00", y: 1},
            {x: "10:00", y: 1},
            {x: "11:00", y: 1},
            {x: "12:00", y: 1},
            {x: "13:00", y: 1},
            {x: "14:00", y: 1},
            {x: "15:00", y: 1},
            {x: "16:00", y: 1},
            {x: "17:00", y: 1},
            {x: "18:00", y: 1},
            {x: "19:00", y: 1},
            {x: "20:00", y: 1},
            {x: "21:00", y: 1},
            {x: "22:00", y: 1},
            {x: "23:00", y: 0} 
        ]
    }

    render() {
    	let placeholder = <LineSeries data={this.placeholder_times} strokeWidth={0}/>
    	let lines = [],
    		active = [],
    		marks = [];

    	if (this.props.series.length > 0 && this.props.data) {
    		lines = [];
    		active = [];
    		marks = [];
            
    		let thisColourWheel = JSON.parse(JSON.stringify(Constants.COLOURWHEEL));

	    	for (var s in this.props.series) {
	    		let thisColour = thisColourWheel.shift();
    			thisColourWheel.push(thisColour);
	    		
	    		active.push({'title': this.props.series[s], color: thisColour});
	    		lines.push(<LineSeries key={s} color={thisColour} data={this.props.data[this.props.series[s]]} />)
	    		marks.push(<MarkSeries key={s} color={thisColour} data={this.props.data[this.props.series[s]]} />)
	    	}
	    }

        return (
        	<div>
        		<DiscreteColorLegend orientation="horizontal" width={Number(this.props.width)} items={ active } />
			    <XYPlot
			        margin={{ bottom: 70 }}
			        xType="ordinal"
			        width={ this.props.width ? Number(this.props.width) : 350 }
			        height={ this.props.height ? Number(this.props.height) : 350 }>
			        <VerticalGridLines/>
			        <HorizontalGridLines/>
			        <XAxis title={ this.props.X ? this.props.X : null } tickLabelAngle={ -45 } />
			        <YAxis title={ this.props.Y ? this.props.Y : null } />
			        { this.props.zoom ? null : placeholder }
			        { lines }
			        { marks }
			    </XYPlot>
			</div>
        );
    }
}

export default TimeGraph;