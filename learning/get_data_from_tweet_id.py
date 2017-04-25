from tweepy import Stream
from tweepy import API
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import tweepy
import json
import re
import test
import couchdb

tweet_id = 856392573505593345

couch = couchdb.Server('http://115.146.93.56:8888')
db = couch['melbtweets2']

consumer_key=test.consumer_key
consumer_secret=test.consumer_secret
access_token=test.access_token
access_token_secret=test.access_token_secret

auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token,access_token_secret)

twitterAPI=  API(auth, wait_on_rate_limit_notify=True , wait_on_rate_limit=True, parser=tweepy.parsers.JSONParser())


result = twitterAPI.get_status(tweet_id)

print result
print "/n/n"
print json.dumps(result)