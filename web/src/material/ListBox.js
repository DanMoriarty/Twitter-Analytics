import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as Constants from '../Constants.js'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

function ListBox(props) {
  if (!props.items) {
    console.log('nothing to see here')
    return null;
  }

  return(
    <Card>
      <CardHeader
        actAsExpander={true} 
        showExpandableButton={true}
        title={props.title}
        subtitle={props.subtitle}
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
              <TableHeaderColumn>{props.columnTitle}</TableHeaderColumn>
              </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} >

                {props.items.map(i => (
                  <TableRow key={i}>
                    <TableRowColumn style={{width: '20%',}}>
                      {i}
                    </TableRowColumn>
                    <TableRowColumn>
                      {props.items[i]}
                    </TableRowColumn>
                  </TableRow>
                ))}

              </TableBody>
          </Table>
        }
      />
    </Card>
  );
}

export default ListBox;

