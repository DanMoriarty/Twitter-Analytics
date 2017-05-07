import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import GMap from './GMap.js'
import RaisedButton from 'material-ui/RaisedButton';
import * as Constants from '../Constants.js'
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,
        } from 'material-ui/Table';


class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userText: "",
            error: false,
            topSuburbs: ["Enter a sentence first!", "", "", "", ""],
            choropleths: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }    

    handleText   = (e) => { this.setState({userText: e.target.value}); }
    handleSubmit = ( ) => { 
        this.setState({open: true}); 
        fetch('http://localhost:4444/api/languageModel/'.concat(this.state.userText), Constants.INIT)
            .then(result=>result.json()) 
            .then(items=> this.setState({choropleths:
                  items.scores, topSuburbs: items.topfive, error:false}))
            .catch(error => this.setState({error: true}))
    }

    render() {
        if (!this.props.active) {return null;}
        return (
        <div className="container">
            <div className="left">
                <GMap suburbs={this.props.topSuburbs}/>
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
        </div>
        );
    }
    
}



export default Language;