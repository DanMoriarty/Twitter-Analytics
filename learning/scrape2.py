# -*- coding: utf-8 -*-
"""
Created on Fri Jul 22 19:04:47 2016
@author: Shreyans Shrimal
"""
import time
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json
from textblob import TextBlob
import matplotlib.pyplot as plt
import re

"# -- coding: utf-8 --"

def calctime(a):
    return time.time()-a

positive=0
negative=0
compound=0

count=0
initime=time.time()
plt.ion()

import test

consumer_key=test.consumer_key
consumer_secret=test.consumer_secret
access_token=test.access_token
access_token_secret=test.access_token_secret

class listener(StreamListener):
    
    def on_status(self,status):
        try:
            print status.text
            # tweet = json.loads(data)
            # print tweet['text']
            # print tweet['']
            # print "\n\n"
        except KeyError:
            print("Tossed it out cause it was trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------\n\n")

    def on_error(self,status):
        print status


auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token,access_token_secret)

twitterStream=  Stream(auth, listener(count))
twitterStream.filter(locations=[144.252215,-38.256574,145.659838,-37.280438])



        
