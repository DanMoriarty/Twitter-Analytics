import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const avatarPath = "./images/"
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

function AuthorCards(props) {
  if (!props.active) {
    return null;
  }

  return(
    <div id="cards" style={styles.root}>
      <AuthorCard
        name="Tim Glennan"
        role="NeCTAR / Sentiment / Node API / Web Design"
        avatar="tim.jpg"
        bio="Placeholder bio."
      />
      <AuthorCard
        name="Tom Lynch"
        role="NeCTAR / Tweet Scraping / Database Management / Analytics"
        avatar="tom.jpg"
        bio="Placeholder bio."
      />
      <AuthorCard
        name="Daniel Moriarty"
        role="Maps Visualisation / Analytics"
        avatar="dan.jpg"
        bio="Placeholder bio."
      />
      <AuthorCard
        name="Steven Spratley"
        role="Sentiment / Language Modelling"
        avatar="steve.jpg"
        bio="Placeholder bio."
      />
      <AuthorCard
        name="Angus White"
        role="NeCTAR / Tweet Scraping / Database Management / Automation"
        avatar="angus.jpg"
        bio="Placeholder bio."
      />
    </div>)
}

function AuthorCard(props) {
  return(
      <div className="authorCard">
        <Card>
          <CardHeader
            title={props.name}
            subtitle={props.role}
            avatar={avatarPath + props.avatar}
          />
          <CardText>
            {props.bio}
          </CardText>
        </Card>
      </div>
    );
};

export default AuthorCards;