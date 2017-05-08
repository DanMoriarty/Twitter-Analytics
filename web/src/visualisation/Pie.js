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
    RadialChart,
    DiscreteColorLegend
} from 'react-vis';
import * as Constants from '../Constants.js'

class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {value: null};

        this.trackVal = this.trackVal.bind(this);
        this.removeVal = this.removeVal.bind(this);
    }

    trackVal(value) {
        console.log(value);
        this.setState({value: value});
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
                    <RadialChart
                        innerRadius={100}
                        radius={140}
                        data={[
                          {angle: 2},
                          {angle: 6},
                          {angle: 2},
                          {angle: 3},
                          {angle: 1}
                        ]}
                        onValueMouseOver={ this.trackVal }
                        onSeriesMouseOut={ this.removeVal } 
                        width={300}
                        height={300}>
                        {value && <Hint value={value}/>}
                    </RadialChart>
            </div>
        );
    }
}

export default Pie;