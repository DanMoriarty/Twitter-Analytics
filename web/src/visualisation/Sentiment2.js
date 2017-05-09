import React from 'react';
import InfoCard from '../material/InfoCard.js'
import GMapAsync2 from './GMapAsync2.js'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  text: { textAlign: 'justify' },
  img: { height: '20%' },
  textblock: {
    width: '60%',
    'marginTop': '5px',
    'marginBottom': '20px',
  }
};  
var show=false
function ShowText() {
  show=true
}

function Sentiment(props) {
    if (!props.active) return null;
    
    const placeholderData = {
        Happiest:[
          
          {suburb:"Epping-East", data: "100.00% Positive Overall"}

          ]
        ,
        Unhappiest: 
          [
          {suburb:"Ashwood-Chadstone", data: "75.56% Negative Overall"}

          ]
        ,
        Neutral: 
          [
          {suburb:"Beaumaris", data: "98.28% Neutral"}
          
          ]
        ,
        Controversial: [
          {suburb:"Fawkner", data: "pos 50.00% : neg 50.00%"}

          ]
        

      }


    return (
      <div className="container">
        <div className="left">
          <div>
            
              <CardMedia overlay={<CardTitle title="City Sentiment" subtitle="Sentiment in Greater Melbourne by Suburb" />}>
                <img src="images/melbourne.png" style={styles.img} alt="Melbourne Map"/>
              </CardMedia>
              <Card style = {styles.textblock}>
                <CardText style={styles.text}>
                 User-created tweets can carry a large amount of emotion with the information they provide.<br/>
                 By studying the emotive characteristics of each tweet, and then mapping the tweet to a location,<br/>
                 we can garner information about not only on the user's lives, but use this to make meaningful connections<br/>
                 about the places in which these tweets originate.<br/>
                 <br/>
                 The following map displays sentimentality of users by suburb:<br/>
                 What percentage of total sentimental tweets were positive, compared to negative.<br/>
                 And what percentage of total tweets were of a Neutral sentiment.<br/>
                 <br/>
                 Use the below map to explore sentimentality in Melbourne:<br/>
                      -Choose the desired map rendering via the blue buttons and then right-click the map to effectuate the changes<br/>
                      -Click Raw to see and access a snapshot of the raw sentiment and geo data<br/>
                      -Click More to be directed to instructions on how to access and view collected census data<br/>
                  <br/>
                </CardText>
              </Card>
              
              <GMapAsync2 />
           
          </div>
        </div>
        <div className="right">
          <InfoCard
            title="Happiest Suburb"
            subtitle="Highest ratio of positive tweets"
            items={placeholderData['Happiest']}
          />
          <InfoCard
            title="Unhappiest Suburb"
            subtitle="Highest ratio of negative tweets"
            items={placeholderData['Unhappiest']}
          />
          <InfoCard
            title="Most Neutral Suburb"
            subtitle="Highest ratio of neutral tweets"
            items={placeholderData['Neutral']}
          />
          <InfoCard
            title="Controversial Suburbs"
            subtitle="Most polarised ratio of postive/negative tweets"
            items={placeholderData['Controversial']}
          />
        </div>
      </div>

      );
}

export default Sentiment;