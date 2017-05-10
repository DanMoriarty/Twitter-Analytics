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
        studentid="587082"
        course="Master of Computer Science"
      />
      <AuthorCard
        name="Tom Lynch"
        mainroles="NeCTAR / Tweet Scraping / Database Management / Analytics"
        avatar="tom.jpg"
        studentid="540621"
        course="Master of Software Engineering"
      />
      <AuthorCard
        name="Daniel Moriarty"
        mainroles="Maps Visualisation / Analytics"
        avatar="dan.jpg"
        studentid="590617"
        course="Master of Mechanical Engineering"
      />
      <AuthorCard
        name="Steven Spratley"
        mainroles="Sentiment / Language Modelling"
        avatar="steve.jpg"
        studentid=""
        course="Master of Computer Science"
      />
      <AuthorCard
        name="Angus White"
        mainroles="NeCTAR / Tweet Scraping / Database Management / Automation"
        avatar="angus.jpg"
        studentid="585042"
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
