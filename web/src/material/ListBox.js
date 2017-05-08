import React from 'react';
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

  let columnTitles =  Object.keys(props.items[0]);

  let rows =
      props.items.map((data, i) => (
        <TableRow key={i}>
          <TableRowColumn style={{width: '5%'}}>
            {i + 1}
          </TableRowColumn>

          {
          columnTitles.map((title, j) => (
            <TableRowColumn key={j} style={{width: '30%'}}>
              {data[title]}
            </TableRowColumn>
          ))
          }
        </TableRow>
      ));

  let table = 
    <Table style={{tableLayout: 'auto',}}>
      <TableHeader
        adjustForCheckbox={false}
        displaySelectAll={false}
      >
      <TableRow>
        <TableHeaderColumn style={{width: '5%'}}>Rank</TableHeaderColumn>
        { 
          columnTitles.map((title, i) => (
            <TableHeaderColumn key={i} style={{width: '30%'}}>{title}</TableHeaderColumn>
          ))
        }
        </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} >
          {rows}
        </TableBody>
    </Table>;

  return(
    <div className="listBox">
      <Card>
        <CardHeader
          actAsExpander={true} 
          showExpandableButton={true}
          title={props.title}
          subtitle={props.subtitle}
        />
        <CardText
          expandable={true}
          children={table}
        />
      </Card>
    </div>
  );
}

export default ListBox;

