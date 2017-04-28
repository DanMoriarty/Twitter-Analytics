from tweepy import Stream
from tweepy import API
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import tweepy
import json
import re
import test
import couchdb

couch = couchdb.Server('http://115.146.93.56:8888')
db = couch['melbtweets2']

consumer_key=test.consumer_key
consumer_secret=test.consumer_secret
access_token=test.access_token
access_token_secret=test.access_token_secret

auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token,access_token_secret)

twitterAPI=  API(auth, wait_on_rate_limit_notify=True , wait_on_rate_limit=True, parser=tweepy.parsers.JSONParser())

def insert_tweet(tweet):
    if tweet['id_str'] in db:
        print('Duplicate ignored')
    else:
        if tweet['coordinates']:
            entry = dict(tweet)
            del entry['id']
            del entry['id_str']
            db[tweet['id_str']] = entry

last_id = 2
loops = 1
for i in range(loops):
    try:
        results = twitterAPI.search(q="",geocode="-37.904199,144.920201,70km", count=1, max_id=str(last_id-1))
        # print results
        # print json.dumps(results)
        if not results:
            break
        last_id = results['statuses'][-1]['id']
        # print last_id
        for tweet in results['statuses']:
            print tweet
            insert_tweet(tweet)
            if tweet['coordinates']:
                last_id_t = 2
                for j in range(16):
                    timeline = twitterAPI.user_timeline(id=tweet['user']['id'], count=200, max_id=str(last_id_t-1))
                    if not timeline:
                        break
                    last_id_t = timeline[-1]['id']
                    for timeline_tweet in timeline:
                        insert_tweet(timeline_tweet)
    except:
        print 'Oops'
        break
# outfile.write(']')
