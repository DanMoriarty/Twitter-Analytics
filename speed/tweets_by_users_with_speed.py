from haversine import haversine
from datetime import datetime

for ID in db:
	try:
		user = db[ID]['doc']['user']['screen_name']
		print user,
		print "CAT"
		if user in db:
			print "here already"
			doc = db[user]
			
			last_created_at = doc['created_at'][-1]
			this_created_at = db[ID]['doc']['created_at']

			last_time = datetime.strptime(last_created_at,'%a %b %d %H:%M:%S +0000 %Y')
			this_time = datetime.strptime(this_created_at,'%a %b %d %H:%M:%S +0000 %Y')

			last_coordinates = doc['coordinates'][-1]
			this_coordinates = db[ID]['doc']['coordinates']['coordinates']

			distance = haversine([last_coordinates[1],last_coordinates[0]],[this_coordinates[1],this_coordinates[0]])
			d_time_hours = ((last_time - this_time).total_seconds())/60/60
			# abs_time_seconds = abs(d_time_hours)

			speed = distance/d_time_hours

			doc['text'].append(db[ID]['doc']['text'])
			doc['created_at'].append(db[ID]['doc']['created_at'])
			doc['coordinates'].append(db[ID]['doc']['coordinates']['coordinates'])
			doc['speed'].append(speed)
			db[user] = doc

		else:
			print "new user-----------------"
			db[user] = {'type':'user','speed':[],'text':[db[ID]['doc']['text']],'created_at':[db[ID]['doc']['created_at']],'coordinates':[db[ID]['doc']['coordinates']['coordinates']]}
		tweet = db[ID]
		tweet['in_user_doc'] = 'true'
		db[ID] = tweet
	except:
		x = 0




























