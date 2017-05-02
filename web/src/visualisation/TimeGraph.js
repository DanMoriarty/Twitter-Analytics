import React, { Component } from 'react';
import {
    XYPlot, 
    XAxis, 
    YAxis, 
    VerticalGridLines, 
    HorizontalGridLines,  
    LineSeries, 
    Hint
} from 'react-vis';

class TimeGraph extends Component {
    constructor(props) {
        super(props);
    }

    render() {    
        return (    
          <XYPlot
            margin={{ bottom: 70 }}
            xType="ordinal"
            width={ this.props.width ? Number(this.props.width) : 350 }
            height={ this.props.height ? Number(this.props.height) : 350 }>
            <VerticalGridLines/>
            <HorizontalGridLines/>
            <XAxis title={ this.props.X ? this.props.X : null } tickLabelAngle={ -45 } />
            <YAxis title={ this.props.Y ? this.props.Y : null } />
            <LineSeries data={ this.props.data } />
          </XYPlot>
        );
    }
}

export default TimeGraph;