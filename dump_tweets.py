import ijson
import couchdb


from ijson import common, yajl2
from itertools import imap

def floaten(event):
    if event[1] == 'number':
        return (event[0], event[1], float(event[2]))
    else:
        return event

couch = couchdb.Server('http://115.146.93.56:8888')
db = couch['melbtweets2']

f = open('/mnt/tweets_melb1000000.json','r')

events = imap(floaten, yajl2.parse(f))
tweets = common.items(events, 'item')

# tweets = ijson.items(f,'item')

for index, tweet in enumerate(tweets):
	if tweet['id_str'] in db:
		print('Duplicate ignored')
	else:
		if tweet['coordinates']:
			entry = dict(tweet)
			del entry['id']
			del entry['id_str']
			db[tweet['id_str']] = entry
