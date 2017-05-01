import React, {Component} from 'react';
import InfoCard from '../material/InfoCard.js'
import GMap from './GMap.js'

function Sentiment(props) {
    if (!props.active) return null;
    
    const placeholderData = 
      [
        {suburb:"Parkville", data: "20.00% Positive (Pos: 20, Neg: 80)"},
        {suburb:"Melbourne", data: "98.03% Positive (Pos: 100, Neg: 2)"}
      ]

    return (
      <div className="container">
        <div className="left">
          <GMap/>
        </div>
        <div className="right">
          <InfoCard
            title="Happiest Suburbs"
            subtitle="Highest ratio of positive tweets"
            items={placeholderData}
          />
          <InfoCard
            title="Unhappiest Suburbs"
            subtitle="Highest ratio of negative tweets"
            items={placeholderData}
          />
          <InfoCard
            title="Neutral Suburbs"
            subtitle="Highest ratio of neutral tweets"
            items={placeholderData}
          />
          <InfoCard
            title="Controversial Suburbs"
            subtitle="Most mixed ratio of postive/negative tweets"
            items={placeholderData}
          />
        </div>
      </div>

      );
}

export default Sentiment;