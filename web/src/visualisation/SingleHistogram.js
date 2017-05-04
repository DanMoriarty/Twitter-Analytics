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
        // Map each set of data to a VerticalBarSeries
        // const verticalBars = this.props.data.map(
        //     (data, i) => (<VerticalBarSeries key={i} data={data}/>)
        // );
        
        const yMax = getYMax(this.props.data);
    
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
            <VerticalBarSeries
                onValueMouseOver={ this.trackVal }
                onValueMouseOut={ this.removeVal }
                data={ this.props.data }
                color={ Constants.COLOURWHEEL[0] }
            />
            
            { 
                // Snap to
                // value ? 
                // <LineSeries data={[{x: value.x, y: value.y}, {x: value.x, y: yMax}]} stroke="black"/> 
                // : null
            }

            { 
                // Display text
                value ? 
                <Hint
                    value={ value }
                    // Uncomment the align if we want to align it to the top edge
                    // align={ { horizontal: Hint.AUTO, vertical: Hint.ALIGN.TOP_EDGE } } 
                />
                : null
            }

          </XYPlot>
        );
    }
}

function getYMax(data) {
    let yVals = [] 
    for (var d in data) 
    {
        yVals.push(data[d]['y']);
    }

    return Math.max(...yVals);
}

export default SingleHistogram;