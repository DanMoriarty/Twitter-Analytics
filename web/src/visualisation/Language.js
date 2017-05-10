import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import GChoropleth from './GChoropleth.js'
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import * as Constants from '../Constants.js'
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,
        } from 'material-ui/Table';


function percentageDisplay(score) {
    if (score == "indeterminate") return "";
    else
        return Math.round(score * 1000) / 10 + "%";
}

class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userText: "",
            error: false,
            topSuburbs: ["Enter a sentence first!", "", "", "", ""],
            scores: null,
            socioec: "indeterminate",
            socioecBar: "indeterminate"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }    

    handleText   = (e) => { this.setState({userText: e.target.value}); }
    handleSubmit = ( ) => { 
        this.setState({open: true}); 
        fetch(Constants.APIPATH + 'languageModel/'.concat(this.state.userText), Constants.INIT)
            .then(result=>result.json()) 
            .then(items=> this.setState({scores: processScores(items.scores), 
                topSuburbs: items.topfive,
                socioec: items.socioec,
                socioecBar: "determinate", error:false}))
            .catch(error => this.setState({error: true}))
    }

    render() {
        if (!this.props.active) {return null;}
        return (
        <div className="container">
            <div className="left">
              <GChoropleth
                data={this.state.scores}
                melbPolygons={this.props.melbPolygons}
              />
            </div>
            
            <div className="right">
                <Card>
                    <CardTitle 
                        title="Language Analytics" 
                        subtitle="Querying suburb-level language models"
                    />
                    <CardText style={{textAlign: 'justify',}}>
            Melbourne displays a diversity of languages. Even amongst 
            English speakers, there are subjects and phrasings idiosyncratic 
            to different suburbs and socio-economic backgrounds. With enough
            data, these features might be used to perform meaningful analysis
            of new text, including classification of probable locations of 
            origin.
                    </CardText>

                    <div>
                        <div style={{margin: '15'}}>
                            <TextField
                                fullWidth='true'
                                floatingLabelText="Type any sentence..."
                                value={this.state.userText}
                                onChange={this.handleText}
                            />
                            <div style={{textAlign: 'center',}}>
                                <RaisedButton
                                    onTouchTap={this.handleSubmit}
                                    secondary={true}
                                    label="Analyse"
                                />
                            </div>
                            <br/>
                        </div>
                        <Snackbar
                            open={this.state.open}
                            message="Analysing text with language models..."
                            autoHideDuration={4000}
                        />
                    </div>

                </Card>
                <div className="listBox">
                    <Card>
                        <CardHeader
                            actAsExpander={true} 
                            showExpandableButton={true}
                            title="Likely Suburbs of Origin"
                            subtitle="Based on language model analysis"
                        />
                        <CardText
                            expandable={true}
                            children={
                                <Table style={{tableLayout: 'auto',}}>
                                <TableHeader
                                    adjustForCheckbox={false}
                                    displaySelectAll={false}
                                >
                                <TableRow>
                                    <TableHeaderColumn style={{width: '20%',}}>Rank</TableHeaderColumn>
                                    <TableHeaderColumn>Suburb</TableHeaderColumn>
                                </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} >
                                <TableRow>
                                    <TableRowColumn style={{width: '20%',}}>1.</TableRowColumn>
                                    <TableRowColumn>{this.state.topSuburbs[0]}
                                        </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{width: '20%',}}>2.</TableRowColumn>
                                    <TableRowColumn>{this.state.topSuburbs[1]}
                                        </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{width: '20%',}}>3.</TableRowColumn>
                                    <TableRowColumn>{this.state.topSuburbs[2]}
                                        </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{width: '20%',}}>4.</TableRowColumn>
                                    <TableRowColumn>{this.state.topSuburbs[3]}
                                        </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{width: '20%',}}>5.</TableRowColumn>
                                    <TableRowColumn>{this.state.topSuburbs[4]}
                                        </TableRowColumn>
                                </TableRow>
                                </TableBody>
                                </Table>
                            }
                        />
                    </Card>
                </div>
                <div className="listBox">
                    <Card>
                        <CardHeader
                            actAsExpander={true} 
                            showExpandableButton={true}
                            title="Estimated Socio-economic Background"
                            subtitle="Comparison with AURIN suburb data"
                        />
                        <CardText style={{textAlign: 'justify'}}
                            expandable={true}>

        Separate language models were built for groups of suburbs that fell on the 
        intersection of similar socio-economic indicators, provided by AURIN.
                        <div style={{textAlign: 'center', margin:'5'}}>
                            <br/>Low<LinearProgress mode={this.state.socioecBar} 
                        value={this.state.socioec}
                        max='1'
                        style={{width:'80%', margin:'2', display:'inline-block'}} /> High
                        <br/>{percentageDisplay(this.state.socioec)}
                        </div>
                        </CardText>

                    </Card>  
                </div>              
            </div>
        </div>
        );
    }
    
}

function processScores(scores) {
    let processed = {};
    console.log(scores);

    for (var key in scores) {
        processed[key] = {data: scores[key]}
    }

    return processed
}

export default Language;