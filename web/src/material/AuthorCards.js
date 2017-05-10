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
        mainroles="NeCTAR / Sentiment / Node API / Web Design / Maps / Analytics"
        avatar="tim.jpg"
        course="Master of Computer Science"
      />
      <AuthorCard
        name="Tom Lynch"
        mainroles="NeCTAR / Tweet Harvesting / Database Management / Analytics"
        avatar="tom.jpg"
        course="Master of Software Engineering"
      />
      <AuthorCard
        name="Daniel Moriarty"
        mainroles="Maps Visualisation / Analytics"
        avatar="dan.jpg"
        course="Master of Mechanical Engineering"
      />
      <AuthorCard
        name="Steven Spratley"
        mainroles="Sentiment / Language Modelling / Analytics"
        avatar="steve.jpg"
        course="Master of Computer Science"
      />
      <AuthorCard
        name="Angus White"
        mainroles="NeCTAR / Tweet Harvesting / Database Management / Automation"
        avatar="angus.jpg"
        course="Master of Electrical Engineering"
      />
    </div>)
}

function AuthorCard(props) {
  return(
      <div className="authorCard">
        <Card>
          <CardHeader
            title={props.name}
            subtitle={props.course}
            avatar={avatarPath + props.avatar}
          />
          <CardText>
            Key Roles: {props.mainroles}
          </CardText>
        </Card>
      </div>
    );
};

export default AuthorCards;
