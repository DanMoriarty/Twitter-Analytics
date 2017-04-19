from tweepy import Stream
from tweepy import API
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import tweepy
import json
import re
import test
import couchdb

couch = couchdb.Server()
try:
    couch = couchdb.Server() # assuming localhost
    db = couch['melbtweets1']
except:
    db = couch.create('melbtweets1')



consumer_key=test.consumer_key
consumer_secret=test.consumer_secret
access_token=test.access_token
access_token_secret=test.access_token_secret


auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token,access_token_secret)

twitterAPI=  API(auth, wait_on_rate_limit_notify=True , wait_on_rate_limit=True, parser=tweepy.parsers.JSONParser())

last_id = 2
loops = 1
for i in range(loops):
    # try:
    results = twitterAPI.search(q="",geocode="-37.904199,144.920201,70km", count=50, max_id=str(last_id-1))
    if not results:
        break
    last_id = results['statuses'][-1]['id']

    for element in results['statuses']:
        print element
        db.save(element)
