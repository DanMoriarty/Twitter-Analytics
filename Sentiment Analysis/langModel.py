#!/usr/bin/env python
#coding: utf-8
#####---------------------------- DESCRIPTION ----------------------------#####

#    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
#    Course:    COMP90024 Cluster and Cloud Computing
#    Project:   Melbourne Twitter analytics
#    Purpose:   Language analysis
#    Modified:  26/04/2017

#####----------------------------   IMPORTS   ----------------------------#####

import os
import sys
import kenlm
import json
import reverseGeo
import sentiment
from   collections import defaultdict

#####----------------------------  CONSTANTS  ----------------------------#####

CURRENT_D = os.path.dirname(os.path.realpath(__file__))
FILE_PATH = CURRENT_D + "/langModel_files/"
TWEETS    = FILE_PATH + "melbTweets.json"

#Paths to files/folder of cleaned tweets, for language modelling.
SUBURB_FP = FILE_PATH + "suburb_tweets/"
HI_SOC_EC = FILE_PATH + "hi_soc_ec.txt"
LO_SOC_EC = FILE_PATH + "lo_soc_ec.txt"

#Paths to .arpa and binarised (.klm) language models.
#Models built using the klm library, given the above tweet files.
#HOME_DIR  = "/home/sven/Desktop/"
#KLM_BUILD = "/home/sven/Downloads/kenlm-master/build/bin/"
#ARP_M_FP  = HOME_DIR + FILE_PATH + "arpa_models/"
#KLM_M_FP  = HOME_DIR + FILE_PATH + "klm_models/"

KLM_M_FP  = FILE_PATH + "klm_models/"
HI_MODEL  = kenlm.LanguageModel(FILE_PATH + "hi.klm")
LO_MODEL  = kenlm.LanguageModel(FILE_PATH + "lo.klm")

#Language model settings.
N   = 2         #N-gram length.
PAD = 8e5       #Vocabulary padding.

#Separator to use when handling text from stdin.
SEP = "^^^&$&$&^^^"

#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to read in tweets and sort, writing tweets to appropriate files.
#Two txt files will be written (for high and low socioec backgrounds), as well
#   as a folder of txt files; one for each suburb.
def sort_tweets():
    suburb_tweets = defaultdict(list)
    with open(HI_SOC_EC, 'w') as hi_soc_ec_txt:
        with open(LO_SOC_EC, 'w') as lo_soc_ec_txt:
            with open(TWEETS, 'r') as tweets_file:
                tweets = json.load(tweets_file)
                last_t = None
                for tweet in tweets["rows"]:
                    lng = tweet["key"][0]
                    lat = tweet["key"][1]
                    txt = sentiment.cleanTweet(tweet["value"])

                    #Disregard duplicate or check-in tweets.
                    if txt != last_t and txt[:5] != "im at":
                        #Place in suburb dict, and write to socioec file.
                        suburb_tweets[reverseGeo.sa2_code(lat,lng)].append(txt)
                        socioec = reverseGeo.socioec(lat,lng)
                        if socioec == 1:
                            hi_soc_ec_txt.write(txt+'\n')
                        elif socioec == 0:
                            lo_soc_ec_txt.write(txt+'\n')
                        last_t = txt
                        
    #Write dict contents to disk (one file per suburb) for language modelling.
    for suburb in suburb_tweets:
        if suburb != None:
            with open(SUBURB_FP + suburb + "_tweets.txt", 'w') as tf:
                for tweet in suburb_tweets[suburb]:           
                    tf.write(tweet+"\n")

#Funtion to create language models from suburb text files.
def create_models():
    for filename in os.listdir(SUBURB_FP):
        infile  = HOME_DIR + SUBURB_FP + filename
        outfile = ARP_M_FP + filename[:-4] + ".arpa"
        command = "cat {0} | {1}lmplz -o {2} --vocab_pad {3} > {4}" \
                  .format(infile, KLM_BUILD, N, PAD, outfile)
        os.system(command)

#Function to binarise .arpa models for quick use in other functions.
def binarise_models():
    for filename in os.listdir(ARP_M_FP):
        infile  = ARP_M_FP + filename
        outfile = KLM_M_FP + filename[:-5] + ".klm"
        command = "{0}build_binary {1} {2}".format(KLM_BUILD, infile, outfile)
        os.system(command)

#Function to classify socioeconomic background for txt, given lang models.
def classify(text):
    txt = sentiment.cleanTweet(text)
    hi_score = HI_MODEL.score(txt)
    lo_score = LO_MODEL.score(txt)
    if hi_score > lo_score:
        return 1
    return 0

#Function to return sorted list of language model scores, one for every suburb.
def suburb_scores(text):
    text   = sentiment.cleanTweet(text)
    scores = []
    for model_file in os.listdir(KLM_M_FP):
        sa2 = model_file[:9]
        scores.append((sa2, kenlm.LanguageModel(KLM_M_FP+model_file).score(text)))
    scores  = sorted(scores, key=lambda x: x[1], reverse=True)
    topfive = [reverseGeo.sa2_name(s[0]) for s in scores[:5]]
    scores  = dict(scores)
    return json.dumps({"topfive": topfive, "scores": scores})
    
#Read data from stdin.
def runLanguageModel(line):
    return line.upper() + "!"

#Main process.
def main():
    line = ' '

    # Wait for stdin forever
    while line:

        # Get next line (blocks until a newline)
        line = sys.stdin.readline().rstrip('\n')

        # Output JSON in {key: input line, "res": results of computation}        
        print json.dumps({"key": line, "res": suburb_scores(line.split(SEP)[0])})

        # Flush stdout
        sys.stdout.flush()
    
    return

#####----------------------------   PROGRAM   ----------------------------##### 

#Start main process.
if __name__ == '__main__':
    main()

#####----------------------------  END  FILE  ----------------------------#####
