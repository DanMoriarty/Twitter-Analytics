import React, { Component } from 'react';
import {
    XYPlot, 
    XAxis, 
    YAxis, 
    VerticalGridLines, 
    HorizontalGridLines, 
    VerticalBarSeries, 
    LineSeries, 
    Hint
} from 'react-vis';
import * as Constants from '../Constants.js'

class SingleHistogram extends Component {
    constructor(props) {
        super(props);
        this.state = {value: null};

        this.trackVal = this.trackVal.bind(this);
        this.removeVal = this.removeVal.bind(this);
    }

    trackVal(value) {
        this.setState({value: value});
    }

    removeVal() {
        this.setState({value: null});
    }

    render() {
        const {value} = this.state;
        return (    
          <XYPlot
            margin={{ bottom: 70 }}
            xType="ordinal"
            width={ this.props.width ? Number(this.props.width) : 350 }
            height={ this.props.height ? Number(this.props.height) : 350 }>
            <VerticalGridLines/>
            <HorizontalGridLines/>
            <VerticalBarSeries
                onValueMouseOver={ this.trackVal }
                onValueMouseOut={ this.removeVal }
                data={ this.props.data }
                color={ Constants.COLOURWHEEL[0] }
            />
            { value && <Hint value={ value } /> }

            <XAxis title={ this.props.X ? this.props.X : null } tickLabelAngle={ -45 } />
            <YAxis title={ this.props.Y ? this.props.Y : null } />

          </XYPlot>
        );
    }
}


export default SingleHistogram;