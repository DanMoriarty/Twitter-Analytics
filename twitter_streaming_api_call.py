from tweepy import Stream
from tweepy import API
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import tweepy
import json
import re
import test2
import couchdb



couch = couchdb.Server('http://115.146.93.56:8888')
db = couch['melbtweets2streaming']

consumer_key=test2.consumer_key
consumer_secret=test2.consumer_secret
access_token=test2.access_token
access_token_secret=test2.access_token_secret

auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token,access_token_secret)

# twitterAPI=  API(auth, wait_on_rate_limit_notify=True , wait_on_rate_limit=True, parser=tweepy.parsers.JSONParser())

def insert_tweet(tweet):
    if tweet['id_str'] in db:
        print('Duplicate ignored')
    else:
        if tweet['coordinates']:
            entry = dict(tweet)
            del entry['id']
            del entry['id_str']
            db[tweet['id_str']] = entry

class listener(StreamListener):
    def on_status(self,status):
        try:
            tweet = status._json
            insert_tweet(tweet)

        except KeyError:
            print("Tossed it out")
    
    def on_error(self,status):
        print status

count = 0
auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token,access_token_secret)

twitterStream=  Stream(auth, listener(count))
twitterStream.filter(locations=[144.187316894, -38.49659351, 145.763854980, -37.23907530])
