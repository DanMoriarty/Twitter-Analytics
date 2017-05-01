import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

const styles = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  infoBox: {
    width: '99%',
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