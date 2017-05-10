#!/usr/bin/env python
#coding: utf-8
#####---------------------------- DESCRIPTION ----------------------------#####

#    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
#    Course:    COMP90024 Cluster and Cloud Computing
#    Project:   Melbourne Twitter analytics
#    Purpose:   To retrieve as many tweets as possible from the past 2 weeks
#    Modified:  26/04/2017

#####----------------------------   IMPORTS   ----------------------------#####

from tweepy import Stream
from tweepy import API
from tweepy import OAuthHandler
import tweepy
import couchdb
import sentiment
import reverseGeo
import os

#####----------------------------  CONSTANTS  ----------------------------#####

couch = couchdb.Server("http://" + os.environ['COUCH_SERVER'])
try:
    db = couch['melbtweets']
except:
    db = couch.create('melbtweets')

consumer_key1=os.environ['TWITTER_CONSUMERKEY1']
consumer_secret1=os.environ['TWITTER_CONSUMERSECRET1']
access_token1=os.environ['TWITTER_ACCESSTOKEN1']
access_token_secret1=os.environ['TWITTER_SECRETACCESSTOKEN1']

consumer_key2=os.environ['TWITTER_CONSUMERKEY2']
consumer_secret2=os.environ['TWITTER_CONSUMERSECRET2']
access_token2=os.environ['TWITTER_ACCESSTOKEN2']
access_token_secret2=os.environ['TWITTER_SECRETACCESSTOKEN2']

auth1=OAuthHandler(consumer_key1,consumer_secret1)
auth1.set_access_token(access_token1,access_token_secret1)

auth2=OAuthHandler(consumer_key2,consumer_secret2)
auth2.set_access_token(access_token2,access_token_secret2)

twitterAPI1 =  API(auth1, wait_on_rate_limit_notify=True ,
    wait_on_rate_limit=True, parser=tweepy.parsers.JSONParser())
twitterAPI2 =  API(auth2, wait_on_rate_limit_notify=True ,
    wait_on_rate_limit=True, parser=tweepy.parsers.JSONParser())

twitterAPI = twitterAPI1

#####----------------------------  FUNCTIONS  ----------------------------#####

#Inserts a tweet into the database after checking for duplicates and doing
#preliminary analysis.
def insert_tweet(tweet, db):
    if tweet['id_str'] in db:
        print('Duplicate ignored')
    else:
        if tweet['coordinates']:
            entry = dict(tweet)
            del entry['id']
            del entry['id_str']
            entry['sentiment'] = sentiment.classify(entry['text'])
            coords = tweet['geo']['coordinates']
            sa2_code = reverseGeo.sa2_code(coords[0], coords[1])
            entry['sa2_code'] = sa2_code
            entry['sa2_name'] = reverseGeo.sa2_name(sa2_code)
            db[tweet['id_str']] = entry


last_id = 0
loops = 10000
for i in range(loops):
    try:
        if last_id == 0:
            results = twitterAPI.search(q="", #Run a query for tweets in the greater melbourne area
                geocode="-37.904199,144.920201,70km", count=100)
        else:
            results = twitterAPI.search(q="",
                geocode="-37.904199,144.920201,70km", count=100,
                max_id=str(last_id-1))
        if not results:
            break
        last_id = results['statuses'][-1]['id']
        for tweet in results['statuses']:
            insert_tweet(tweet, db)
            if tweet['coordinates']:
                last_tweet_t = 0
                for j in range(16):
                # maximum of 3200 tweets returned by this API call for a user
                    try:
                        #request user timeline
                        if last_tweet_t == 0:
                            timeline = twitterAPI.user_timeline(id=tweet['user']['id_str'], count=200)
                        else:
                            timeline = twitterAPI.user_timeline(id=tweet['user']['id_str'], count=200, max_id=str(last_tweet_t-1))
                        last_tweet_t = timeline[-1]['id']
                        if not timeline:
                            break
                        for timeline_tweet in timeline:
                            insert_tweet(timeline_tweet, db)
                    except:
                        break
        if twitterAPI.rate_limit_status() == 1:
            # swap APIs if rate limited
            if twitterAPI == twitterAPI1:
                twitterAPI = twitterAPI2
            else:
                twitterAPI = twitterAPI1
    except:
        print 'Oops'
        break
