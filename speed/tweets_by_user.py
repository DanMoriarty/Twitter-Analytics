import couchdb
#####---------------------------- DESCRIPTION ----------------------------#####

#    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
#    Course:    COMP90024 Cluster and Cloud Computing
#    Project:   Melbourne Twitter analytics
#    Purpose:   Add new fields documents in the database
#    Modified:  22/04/2017


#####----------------------------  CONSTANTS  ----------------------------#####

USER = "clustercloud"
PSWD = "pineapple"
HOST = "115.146.95.86" #Sherlock
PORT = "8888"

DB   = "melbtweets_sentiment"   #The main tweets database.
# DB   = "melbtweets_sentiment" #100-tweet database for development.

#####----------------------------  FUNCTIONS  ----------------------------#####

# Function to read in tweets and assign sentiment labels to an entire database.
# IMPORTANT NOTE: sentiment labels are automatically added to new tweets with
# our harvester now, but this legacy code demonstrates how we could easily update 
# documents in our database with new fields.

def creating_user_docs(db):
	print 'start'
	for ID in db:
		try:
			user = db[ID]['user']['screen_name']
			if user in db:
				doc = db[user]
				doc['text'].append(db[ID]['text'])
				doc['created_at'].append(db[ID]['created_at'])
				doc['coordinates'].append(db[ID]['coordinates']['coordinates'])
				db[user] = doc
			else:
				db[user] = {'type':'user','text':[db[ID]['text']],'created_at':[db[ID]['created_at']],'coordinates':[db[ID]['coordinates']['coordinates']]}
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

#####----------------------------  END  FILE  ----------------------------#####

