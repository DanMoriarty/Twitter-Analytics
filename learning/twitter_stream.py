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
import re


count=0

import test2

consumer_key=test2.consumer_key
consumer_secret=test2.consumer_secret
access_token=test2.access_token
access_token_secret=test2.access_token_secret

class listener(StreamListener):

    def on_status(self,status):
        try:
            # option 1
            print status.text
            print status.id
            print status.coordinates

            #  option 2
            print status

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
