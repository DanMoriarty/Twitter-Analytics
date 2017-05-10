import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const styles =
  {
    text: { textAlign: 'justify' },
    img: { height: '20%' },
  }

function Home(props) {
  if (!props.active) return null;

  return(
    <div className="homeCard" id="cards">
      <Card>
        <CardMedia overlay={<CardTitle title="About this project..." subtitle="Cluster and Cloud Computing" />}>
          <img src="images/melbourne.png" style={styles.img} alt="Melbourne Map"/>
        </CardMedia>
        <CardText style={styles.text}>
          A cloud-based Twitter analytics solution.  Data is continuously harvested
          using the Twitter developer APIs, and added to a CouchDB database clustered
          across 4 nodes.  On this page, you can find visualisations of the sentiment of
          tweets in the greater Melbourne area, plots of sentiment vs time of day, and
          details of the movement patterns of Twitter users.  This solution was produced
          for COMP90024 Cluster and Cloud Computing in semester 1, 2017.
        </CardText>
      </Card>
    </div>
  );
}

export default Home;
