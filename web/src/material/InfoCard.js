//---------------------------- DESCRIPTION ----------------------------//
//    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
//    Course:    COMP90024 Cluster and Cloud Computing
//    Project:   Melbourne Twitter analytics
//    Purpose:   A simple component to present information on a "card".
//    Modified:  30/04/2017
//---------------------------- DESCRIPTION ----------------------------//

import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

const styles = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  infoBox: {
    width: '100%',
    'marginTop': '5px',
    'marginBottom': '5px',
  }
};

function InfoCardList(props) {
  const listItems = props.items.map(
        item => 
        (
          <ListItem
            key={item.suburb}
            primaryText={item.suburb}
            secondaryText={item.data}
            disabled={true}
          />
        ));
  
  return (
    <List>
      {listItems}
    </List>
  )
};

function InfoCard(props) {

  return(
    <Card style={styles.infoBox}>
      <CardHeader
        title={props.title}
        subtitle={props.subtitle}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <InfoCardList items={props.items} />
      </CardText>
    </Card>
  )
};

export default InfoCard;