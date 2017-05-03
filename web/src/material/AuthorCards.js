import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const avatarPath = "./images/"
const style = {
  display: 'flex',
  flexWrap: 'wrap'
};

function AuthorCards(props) {
  if (!props.active) {
    return null;
  }

  return(
    <div id="cards" style={style}>
      <AuthorCard
        name="Tim Glennan"
        mainroles="NeCTAR / Sentiment / Node API / Web Design / Analytics"
        avatar="tim.jpg"
        bio="Placeholder bio."
      />
      <AuthorCard
        name="Tom Lynch"
        mainroles="NeCTAR / Tweet Scraping / Database Management / Analytics"
        avatar="tom.jpg"
        bio="Placeholder bio."
      />
      <AuthorCard
        name="Daniel Moriarty"
        mainroles="Maps Visualisation / Analytics"
        avatar="dan.jpg"
        bio="Placeholder bio."
      />
      <AuthorCard
        name="Steven Spratley"
        mainroles="Sentiment / Language Modelling"
        avatar="steve.jpg"
        bio="Placeholder bio."
      />
      <AuthorCard
        name="Angus White"
        mainroles="NeCTAR / Tweet Scraping / Database Management / Automation"
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
            subtitle={props.mainroles}
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