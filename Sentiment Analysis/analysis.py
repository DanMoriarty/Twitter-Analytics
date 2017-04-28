#!/usr/bin/env python
#coding: utf-8
#####---------------------------- DESCRIPTION ----------------------------#####

#    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
#    Course:    COMP90024 Cluster and Cloud Computing
#    Project:   Melbourne Twitter analytics
#    Purpose:   To process the database using separate analysis modules
#    Modified:  26/04/2017

#####----------------------------   IMPORTS   ----------------------------#####

import couchdb
import sentiment

#####----------------------------  CONSTANTS  ----------------------------#####

USER = "clustercloud"
PSWD = "pineapple"
HOST = "115.146.95.86" #Sherlock
PORT = "8888"

#DB   = "melbtweets2"   #The main tweets database.
DB   = "melbtweets_sentiment" #100-tweet database for development.

#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to read in tweets and assign sentiment labels to an entire database.
def assign_sentiments(database):
    for tweetID in database:
        tweet = database[tweetID]       
        tweet["sentiment"] = sentiment.classify(tweet["text"])                      
        database[tweetID] = tweet

#####----------------------------   PROGRAM   ----------------------------#####  

#Initialise the server variable and assign sentiments to each tweet in the db.
#Use following comment line to connect to server when credentials are required.
#server = couchdb.Server("http://{0}:{1}@{2}:{3}".format(USER,PSWD,HOST,PORT))
server = couchdb.Server("http://{0}:{1}".format(HOST,PORT))
assign_sentiments(server[DB])

#####----------------------------  END  FILE  ----------------------------#####