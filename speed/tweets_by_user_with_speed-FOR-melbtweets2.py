import couchdb
from haversine import haversine
from datetime import datetime

#####----------------------------  CONSTANTS  ----------------------------#####

USER = "clustercloud"
PSWD = "pineapple"
HOST = "115.146.95.86" #Sherlock
PORT = "8888"

DB   = "melbtweets2"   #The main tweets database.
# DB   = "melbtweets_sentiment" #100-tweet database for development.

#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to read in tweets and assign sentiment labels to an entire database.


def creating_user_docs(db):
	x = 0
	for ID in db:
		try:
			user = db[ID]['user']['screen_name']
			if user in db:
				doc = db[user]
				x = x + 1
				last_created_at = doc['created_at'][-1]
				this_created_at = db[ID]['created_at']

				last_time = datetime.strptime(last_created_at,'%a %b %d %H:%M:%S +0000 %Y')
				this_time = datetime.strptime(this_created_at,'%a %b %d %H:%M:%S +0000 %Y')

				last_coordinates = doc['coordinates'][-1]
				this_coordinates = db[ID]['coordinates']['coordinates']

				distance = haversine([last_coordinates[1],last_coordinates[0]],[this_coordinates[1],this_coordinates[0]])
				
				
				tweetid = db[ID]['_id']
				# abs_time_seconds = abs(d_time_hours)

				speed = distance/d_time_hours
				if(x == 100):
					print(".")
					x = 0
				if(speed > 25):
					print speed, user, tweetid
				doc['text'].append(db[ID]['text'])
				doc['tweetid'].append(tweetid)
				doc['created_at'].append(db[ID]['created_at'])
				doc['coordinates'].append(db[ID]['coordinates']['coordinates'])
				doc['speed'].append(speed)

				db[user] = doc
			else:
				db[user] = {'type':'user','tweetid':[db[ID]['_id']],'speed':[0],'text':[db[ID]['text']],'created_at':[db[ID]['created_at']],'coordinates':[db[ID]['coordinates']['coordinates']]}
				# db[user] = {'type':'user','tweetid':[db[ID]['_id']]}
				
			tweet = db[ID]
			tweet['in_user_doc'] = 'true'
			db[ID] = tweet
		except:
			x = 0




#####----------------------------   PROGRAM   ----------------------------#####  

#Initialise the server variable and assign sentiments to each tweet in the db.
#Use following comment line to connect to server when credentials are required.
#server = couchdb.Server("http://{0}:{1}@{2}:{3}".format(USER,PSWD,HOST,PORT))

server = couchdb.Server("http://{0}:{1}".format(HOST,PORT))
creating_user_docs(server[DB])
