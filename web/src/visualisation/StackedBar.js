import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    Hint,
    DiscreteColorLegend
} from 'react-vis';
import * as Constants from '../Constants.js'

class StackedBar extends Component {
    constructor(props) {
        super(props);
        this.state = {value: null};

        this.trackVal = this.trackVal.bind(this);
        this.removeVal = this.removeVal.bind(this);
    }

    trackVal(value) {
        let trueY = value.y;
        if (value.hasOwnProperty("y0"))
            trueY -= value['y0']

        this.setState({value: {x: value.x, y: trueY}});
    }

    removeVal() {
        this.setState({value: null});
    }

    render() {
        if (this.props.series.length <= 0 || !this.props.data) return null;

        const {value} = this.state;

        let legend = [],
            bars = [];

        if (this.props.series.length > 0 && this.props.data) {            
            let thisColourWheel = JSON.parse(JSON.stringify(Constants.COLOURWHEEL));

            for (var s in this.props.series) {
                let thisColour = thisColourWheel.shift();
                thisColourWheel.push(thisColour);
                
                legend.push({'title': this.props.series[s], color: thisColour});
                bars.push(
                    <VerticalBarSeries 
                        key={s} color={thisColour} 
                        data={this.props.data[this.props.series[s]]}  
                        onValueMouseOver={ this.trackVal }
                        onValueMouseOut={ this.removeVal } 
                    />);
            }
        }
    
        return (    
            <div>
                <DiscreteColorLegend orientation="horizontal" width={Number(this.props.width)} items={ legend } />

                <XYPlot
                    margin={{ bottom: 70 }}
                    xType="ordinal"
                    width={ this.props.width ? Number(this.props.width) : 350 }
                    height={ this.props.height ? Number(this.props.height) : 350 }
                    stackBy={ this.props.stack ? "y" : null}>
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    { bars }
                    { 
                        // Display text
                        value &&
                        <Hint
                            value={ value }
                            align={ { horizontal: Hint.AUTO, vertical: Hint.ALIGN.TOP_EDGE } } 
                        />
                    }
                    <XAxis title={ this.props.X ? this.props.X : null } tickLabelAngle={ -45 } color="black" />
                    <YAxis title={ this.props.Y ? this.props.Y : null } />

                </XYPlot>
            </div>
        );
    }
}

export default StackedBar;