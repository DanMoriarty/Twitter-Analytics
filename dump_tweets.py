import ijson
import couchdb

def parse(events):
    for prefix, event, value in events:
        if event == 'number':
            value = float(value)
        yield prefix, event, value

couch = couchdb.Server('http://115.146.93.56:8888')
db = couch['melbtweets2']

f = open('/mnt/tweets_melb1000000.json','r')

tweets = ijson.common.items(parse(ijson.parse(f)), 'item'):

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
