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
          <img src="images/melbourne.png" style={styles.img} />
        </CardMedia>
        <CardText style={styles.text}>
          In  development and delivery  of  non-trivial software  systems,  working as  part  of  a team  is  generally 
  (typically!)   the   norm.   This  assignment  is  very  much  a   group   project.  Students  will  be  put   into 
  software  teams to  work  on  the implementation  of  the system  described below.    These will  be  teams 
  of   up  to  5 students.   In  this  assignment,   students  need  to  organize  their   team  and   their   collective 
  involvement throughout. There is  no  team  leader  as  such, but teams may decide  to  set up  processes 
  for agreeing  on  the work  and who does  what. Understanding the dependencies  between individual  
  efforts  and   their   successful  integration   is  key   to  the   success   of  the   work  and   for   software 
  engineering projects  more  generally.  
  Assignment  Description
  The  software  engineering   activity  builds  on  the   lecture   materials   describing  Cloud   systems   and  
  especially  the NeCTAR  Research  Cloud and its use of  OpenStack;  on  the Twitter APIs, and CouchDB 
  and  the   kinds   of  data  analytics   (e.g.  MapReduce)   that  CouchDB   supports as  well   as  data  from the 
  Australian  Urban Research  Infrastructure  Network (AURIN  – https://portal.aurin.org.au). The focus 
  of  this  assignment is to  harvest as  many  tweets  as  possible  from  across  the cities  of  Australia on  the 
  NeCTAR  Research   Cloud  and  undertake  a  variety   of  social media  data analytics scenarios  that  tell 
  interesting stories  of  life  in  your  cities  and importantly   how   the   Twitter   data  can   be  used 
  alongside/compared   with/augment the  data  available   within  the  AURIN  platform to   improve   our  
  knowledge  of life  in  the  cities of  Australia. Teams  are expected   to download  data   from  the  AURIN 
  platform  and include this  into  their CouchDB database  for analysis  with  Twitter data.
  The  teams   should  develop   a   Cloud-based   solution  that  exploits  a   multitude   of  virtual   machines 
  (VMs)  across  the   NeCTAR  Research  Cloud   for   harvesting  tweets  through   the   Twitter   APIs  (using 
  both  the Streaming and the Search  API interfaces).  The teams should  produce a solution  that  can be  
  run (in principle)  across  any node  of  the NeCTAR  Research  Cloud to  harvest and store tweets. Teams 
  have  been  allocated four  medium  sized VMs with  8 cores (32Gb memory  total)  and up  to  250Gb of  
  volume  storage and 100Gb of  object  storage.  All students  have  access  to  the NeCTAR  Research  Cloud 
  as  individual   users   and   can   test/develop  their   applications  using   their   own   (small)   VM instances.  
  (Remembering  that  there is  no  persistence in  these small,  free  and dynamically allocated VMs).
        </CardText>
      </Card>
    </div>
  );
}

export default Home;