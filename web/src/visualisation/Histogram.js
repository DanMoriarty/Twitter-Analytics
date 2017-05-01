import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, Hint} from 'react-vis';

function Histogram(props) {
    // Map each set of data to a VerticalBarSeries
    const verticalBars = props.data.map(
        (data, i) => (<VerticalBarSeries key={i} data={data}/>)
    );

    return (
      <XYPlot
        margin={{bottom: 70}}
        xType="ordinal"
        width={props.width ? Number(props.width) : 350}
        height={props.height ? Number(props.height) : 350}>
        <VerticalGridLines/>
        <HorizontalGridLines/>
        <XAxis title={props.X ? props.X : null} tickLabelAngle={-45} />
        <YAxis title={props.Y ? props.Y : null} />
        {verticalBars}
      </XYPlot>
    );
}

export default Histogram;