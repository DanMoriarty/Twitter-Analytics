import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import InfoCard from '../material/InfoCard.js'
class Sentiment extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    if (!this.props.active) return null;
    
    const placeholderData = 
      [
        {suburb:"Parkville", data: "20.00% Positive (Pos: 20, Neg: 80)"},
        {suburb:"Melbourne", data: "98.03% Positive (Pos: 100, Neg: 2)"}
      ]

    return (
      <div className="container">
        <div className="left">
          +++++++++++++ GOOGLE MAPS GOES HERE +++++++++++++++ 
          ++++++++++++++++ ++++++++++++++++
          +++++++++++++ +++++++++++++++ ++++++++++++++++ ++++++++++++++++
          +++++++++++++ +++++++++++++++ ++++++++++++++++ ++++++++++++++++
          +++++++++++++ +++++++++++++++ ++++++++++++++++ ++++++++++++++++
          <br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+
          <br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+
          <br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+<br/>+
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
}


// <div className="center">
//   <RefreshIndicator
//     size={100}
//     left={0}
//     top={50}
//     loadingColor="#FF9800"
//     status="loading"
//     style={styles.refresh}
//   />
// </div>


export default Sentiment;