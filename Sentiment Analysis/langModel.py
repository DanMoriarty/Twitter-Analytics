#!/usr/bin/env python
#coding: utf-8
#####---------------------------- DESCRIPTION ----------------------------#####

#    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
#    Course:    COMP90024 Cluster and Cloud Computing
#    Project:   Melbourne Twitter analytics
#    Purpose:   Language analysis
#    Modified:  26/04/2017

#####----------------------------   IMPORTS   ----------------------------#####

import kenlm
import json
import reverseGeo
import sentiment

#####----------------------------  CONSTANTS  ----------------------------#####

FILE_PATH = "langModel_files/"
TWEETS    = FILE_PATH + "melbTweets.json"

#Paths to tweet files by socioeconomic background.
HI_SOC_EC = FILE_PATH + "hi_soc_ec.txt"
LO_SOC_EC = FILE_PATH + "lo_soc_ec.txt"

#Paths to pre-built, binarised, .arpa language models.
#Models built using the klm library, given the above tweet files.
HI_MODEL  = kenlm.LanguageModel(FILE_PATH + "hi.klm")
LO_MODEL  = kenlm.LanguageModel(FILE_PATH + "lo.klm")

#Path to the training set created by evaluating all tweets with the models.
TRAIN_SET = FILE_PATH + "train_set"
LANG_CLF  = FILE_PATH + "lang_clf"

#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to read in tweets and sort based on socioeconomic background.
def sort_tweets():          
    #Open two output files, and populate with tweets.
    with open(HI_SOC_EC, 'w') as hi_soc_ec_txt:
        with open(LO_SOC_EC, 'w') as lo_soc_ec_txt:
            with open(TWEETS, 'r') as tweets_file:
                tweets = json.load(tweets_file)
                for tweet in tweets["rows"]:
                    lng = tweet["key"][0]
                    lat = tweet["key"][1]
                    txt = sentiment.cleanTweet(tweet["value"])
                    
                    #Grab socioeconomic class and write to file.
                    socioec = reverseGeo.socioec(lat,lng)
                    if socioec == 1:
                        hi_soc_ec_txt.write(txt+'\n')
                    elif socioec == 0:
                        lo_soc_ec_txt.write(txt+'\n')

#Function to classify socioeconomic background for txt, given lang models.
def classify(text):
    txt = sentiment.cleanTweet(text)
    hi_score = HI_MODEL.score(txt)
    lo_score = LO_MODEL.score(txt)
    if hi_score > lo_score:
        return 1
    return 0

#####----------------------------   PROGRAM   ----------------------------##### 

#####----------------------------  END  FILE  ----------------------------#####