import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class Sentiment extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    if (!this.props.active) return null;
    
    return (
      <div className="center">
        <RefreshIndicator
          size={100}
          left={0}
          top={50}
          loadingColor="#FF9800"
          status="loading"
          style={style.refresh}
        />
      </div>

      );
  }
}



export default Sentiment;