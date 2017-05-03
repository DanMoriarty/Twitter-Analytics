# !/usr/bin/env python
# coding: utf-8
#####---------------------------- DESCRIPTION ----------------------------#####

#    Authors:   T. Glennan, D. Moriarty, T. Lynch, S. Spratley, A. White
#    Course:    COMP90024 Cluster and Cloud Computing
#    Project:   Melbourne Twitter analytics
#    Purpose:   To process the database using separate analysis modules
#    Modified:  26/04/2017

#####----------------------------   IMPORTS   ----------------------------#####

import couchdb
# import sentiment

#####----------------------------  CONSTANTS  ----------------------------#####

USER = "clustercloud"
PSWD = "pineapple"
HOST = "115.146.92.136" #Mario
PORT = "8888"

DB1   = "melbtweets_test1"   #The main tweets database.
DB2   = "melbtweets2"
# DB   = "melbtweets_sentiment" #100-tweet database for development.

#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to read in tweets and assign sentiment labels to an entire database.
def assign_sentiments(database1, database2):
    i = 0
    for tweetID in database2:
        i+=1
        print i
        tweet = database2[tweetID]
        database1[tweetID] = tweet
        if i == 100:
            return

#####----------------------------   PROGRAM   ----------------------------#####

#Initialise the server variable and assign sentiments to each tweet in the db.
#Use following comment line to connect to server when credentials are required.
#server = couchdb.Server("http://{0}:{1}@{2}:{3}".format(USER,PSWD,HOST,PORT))
server = couchdb.Server("http://{0}:{1}".format(HOST,PORT))
print server
assign_sentiments(server['melbtweets_test1'], server['melbtweets2'])

#####----------------------------  END  FILE  ----------------------------#####
