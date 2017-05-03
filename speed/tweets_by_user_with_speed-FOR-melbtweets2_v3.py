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
			x = x + 1

			if user in db:
				doc = db[user]
				
				# HERE GOES THE CODE FOR ROUND 2 
				# userspeed = {'type':'userspeeds','tweetid':[db[ID]['_id']],'speed':[0],'text':[db[ID]['text']],'created_at':[db[ID]['created_at']],'coordinates':[db[ID]['coordinates']['coordinates']]}
				# speeddata = {'speed': '0','tweetid1':'0','tweetid2': ,'created_at1':'','created_at2': ,'coords1': ,'coords2': }
				created_at1 = db[user]['userspeed'][-1]['created_at2']
				created_at2 = db[ID]['created_at']
				time1 = datetime.strptime(created_at1,'%a %b %d %H:%M:%S +0000 %Y')
				time2 = datetime.strptime(created_at2,'%a %b %d %H:%M:%S +0000 %Y')
				coords1 = db[user]['userspeed'][-1]['coords2']
				coords2 = db[ID]['coordinates']['coordinates']


				distance = haversine([coords1[1],coords1[0]],[coords2[1],coords2[0]])
				time_h = ((time2 - time1).total_seconds())/60/60
				speed = distance/time_h

				speeddata = {'speed': speed,'tweetid1':db[user]['userspeed'][-1]['tweetid2'],'tweetid2':db[ID]['_id'],
				'created_at1':created_at1,'created_at2':created_at2,'coords1':coords1,'coords2':coords2}
				doc['userspeed'].append(speeddata)
				db[user] = doc
			else:
				# HERE GOES THE CODE FOR INITIALISING THE USER				
				speeddata = {'tweetid2':db[ID]['_id'],'created_at2':db[ID]['created_at'] ,'coords2':db[ID]['coordinates']['coordinates']}
				db[user] = {'userspeed':[speeddata]}
				# db[user] = {'type':'user','tweetid':[db[ID]['_id']]}
				
			tweet = db[ID]
			tweet['in_user_doc'] = 'true'
			db[ID] = tweet

			if(x == 10):
				print(".")
				x = 0
		except:
			x = 0






#####----------------------------   PROGRAM   ----------------------------#####  

#Initialise the server variable and assign sentiments to each tweet in the db.
#Use following comment line to connect to server when credentials are required.
#server = couchdb.Server("http://{0}:{1}@{2}:{3}".format(USER,PSWD,HOST,PORT))

server = couchdb.Server("http://{0}:{1}".format(HOST,PORT))
creating_user_docs(server[DB])
