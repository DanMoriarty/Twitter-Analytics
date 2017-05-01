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
import reverseGeo

#####----------------------------  CONSTANTS  ----------------------------#####

USER = "clustercloud"
PSWD = "pineapple"
HOST = "115.146.92.136"
PORT = "8888"
DB   = "melbtweets_sentiment"   #The main tweets database.

#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to read in a database of tweets and assign labels for analysis.
def assign_labels(database):
    for tweetID in database:
        tweet  = database[tweetID]
        try:
            coords = tweet["geo"]["coordinates"]
            sa2_code = reverseGeo.sa2_code(coords[0], coords[1])
            tweet["sa2_code"] = sa2_code
            tweet["sa2_name"] = reverseGeo.sa2_name(sa2_code)
            database[tweetID] = tweet
        except KeyError:
            continue

#####----------------------------   PROGRAM   ----------------------------#####  

#Initialise the server variable and assign labels to each tweet in the db.
#server = couchdb.Server("http://{0}:{1}@{2}:{3}".format(USER,PSWD,HOST,PORT))

server = couchdb.Server("http://{2}:{3}".format(USER,PSWD,HOST,PORT))
assign_labels(server[DB])

#####----------------------------  END  FILE  ----------------------------#####