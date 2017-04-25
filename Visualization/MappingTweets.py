# -*- coding: utf-8 -*-
"""
Created on Sat Apr 22 19:42:29 2017

@author: DMori
"""

import pandas as pd
import numpy as np
import json
import math
from mpi4py import MPI
from shapely import geometry
import copy
import sys

#==============================================================================
#                               MAIN PROGRAM
#==============================================================================
 #A barebones shell of Vic Suburbs {suburbs} is made (just name and geo) and distributed 
 #between ranks. Each ranks counts tweets mapped to each suburb in its 
 #distributed part and records it.
 #
 #Once that is done, the ranks export the file {suburbOutput1, suburbOutput2, ...},
 #the master then loads these files one at a time and merges the results into 
 #the original masterfile {suburbOutput} (in this case to be safe and not 
 #potentially overwrite masterfile data, it is exported instead to suburbOutputWithTweets)
 
#==============================================================================
### DATA PREPROCESSING ###

  # LOADING DATA #
#for larger datasets, will want to use a file stream
comm = MPI.COMM_WORLD
errors = {}
try:
    with open('EmptySuburbs.json', encoding="utf8") as grid_file:    
        suburbs = json.load(grid_file)
    #with open('some.json', encoding="utf8") as some_file:    
    #    someData = json.load(some_file)
except:
    errors[len(errors)]='grid loading error'

#each rank will only have an n-th of the data, where n is comm.size        
for i in range(1,comm.size):
    for j in range(len(suburbs['features'])):
        if j%i != comm.rank:
            del suburbs['features'][j]

for i in range(len(suburbs['features'])):
    suburbs['features'][i]['properties']['numTweets']=0
    #add other properties here, eg avg tweet sentiment
    
  # CONSTANTS AND VARIABLES #
MELBCENTRE = [144.9631,-37.8136]
NUMSLAVES=comm.size

#==============================================================================
### DATA PROCESSING ###

  # CREATING POLYGONS DEMARCATING EACH SUBURB
#requires Shapely library to be installed
polygons={}
for f in range(len(suburbs['features'])):
    polygon = geometry.Polygon(tuple(suburbs['features'][f]['geometry']['coordinates'][0][0]))
    polygons[f]=polygon
if len(polygons) != len(suburbs['features']):
    errors[len(errors)] = 'Polygon size error'
    sys.exit()

  # TWITTER FILE STREAMING #
#requires twitter files to be separated by new lines
data={}
i=-1
endOfFile=False
with open('TinyTwitter.json', encoding="utf8") as twitter_file:
    a = twitter_file.readline()
    while not endOfFile:
        i+=1
        try: 
            line=twitter_file.readline()
            entry=line[:-2]
            e=json.loads(entry)
            data[i]=e
        except ValueError as err:
            try:
                e=json.loads(line)
                errors[len(errors)]=line
                data[i]=e
            except:
                #EOF or invalid JSON tweet
                if line=='':
                    endOfFile=True
                    break
                else:    
                    pass    
                
        # TWEET MAPPING
        #checking what suburb the tweet was in
        if i<len(data):
            latlng = data[i]['json']['geo']['coordinates']
            #latlng = data[0]['features']['geometry']['coordinates']
            point= geometry.Point(latlng[1],latlng[0])            
            #point= geometry.Point(MELBCENTRE)
            for f in range(len(polygons)):
                if polygons[f].contains(point):
                    #print('%d' % (f)  +'...\n')
                    suburbs['features'][f]['properties']['numTweets']+=1
                    #add other properties here, eg avg tweet sentiment

#once file is closed, export to a file                
if comm.rank!=0: 
    with open('suburbOutput'+ comm.rank + '.json', 'w') as output_file:    
        output_file.write(json.dumps(suburbs))        

  # RESULTS MERGING #        
comm.barrier()
if comm.rank==0: 
    #MASTER
    #load our masterfile of suburb data, to add results into
    with open('SuburbOutput.json', encoding="utf8") as master_file:    
        suburbOutput = json.load(master_file)

    #merge master suburb results with results masterfile
    for i in range(len(suburbs['features'])):
        if i%comm.size == 0:
            suburbOutput['features'][i]['properties']['numTweets']=suburbs['features'][math.floor(i/comm.size)]['properties']['numTweets']    
    
    #merge slave suburb results
    for i in range(1,comm.size):
        with open('suburbOutput'+ 1 + '.json', encoding="utf8") as grid_file:    
            suburbOutput = json.load(grid_file)    
        for j in range(len(suburbs['features'])):
            if j%comm.size == i:
                suburbOutput['features'][j]['properties']['numTweets']=suburbs['features'][math.floor(j/comm.size)]['properties']['numTweets']    
                
  # EXPORT RESULTS #
    with open('suburbOutput'+'With'+'Tweets'+'.json', 'w') as output_file:    
        output_file.write(json.dumps(suburbs))
print('Success! - Check suburbOutputWithTweets.json to see if tweet counts have been recorded\n')
#==============================================================================
# HOUSEKEEPING #
#checking what the largest number of tweets is
max=0
for j in range(len(suburbs['features'])):
    if suburbs['features'][j]['properties']['numTweets']>max:
        max=suburbs['features'][j]['properties']['numTweets']

#printing the error list (unless too long)
TOOLONG=100
print('Errors:\n')
if len(errors)<TOOLONG:
    for j in range(len(errors)):
        print(errors[j][0:min(50,len(errors[j]))])
        if i < (len(errors[j])-1):
            print('...')        