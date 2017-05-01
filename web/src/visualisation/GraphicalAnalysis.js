import React, { Component } from 'react';
import Loading from '../material/Loading.js';

class GraphicalAnalysis extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      error: false
    };
  }

  componentDidMount() {
  	// Load Data from the API
  	var myHeaders = new Headers();
	var myInit = { method: 'GET',
	               headers: myHeaders,
	               mode: 'cors',
	               cache: 'default' };
  	fetch('http://localhost:4444/api/userTweets', myInit)
		.then(result=>result.json()) 
		.then(items=> this.setState({items: items.rows, error:false}))
		.catch(error => this.setState({error: true}))
  }

  render() {
    if (!this.props.active)
    	return null;
    
    if (this.state.error)
    	return (<p>    Failed retrieving data. Please try refreshing the page.</p>);

    if (!this.state.items)
    	return (<Loading />);

    const listItems = this.state.items.map(
        item => 
        (
          <li key={item.key}>{item.key}</li>
        ));
    
    return (<div>List of Users: <br/>{listItems}</div>);
  }
}

export default GraphicalAnalysis;