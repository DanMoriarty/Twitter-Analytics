# -*- coding: utf-8 -*-
"""
Created on Fri Apr 21 23:56:28 2017

@author: DMori
"""
#!!!Currently stores entire file that has been streamed in into local memory. For large files, include 
#constraints in the code odata stores 1000 tweets, pause streaming, run the twitter mapping. Then once these 1000 tweets 
#are mapped, empty data and rinse repeat for next 1000, and again for next 1000, etc, until EOF reached

import pandas as pd
import numpy as np
import json
from mpi4py import MPI
from shapely.geometry import shape, Point
import copy

#==============================================================================
def stripSuburbs(suburbs):
#strips all unnecessary properties from the sourced suburb data, leaving just a name
#geo and metadata still included
    
    for j in range(len(grid['features'])):
        suburbs['features'][j]['properties']={}
        suburbs['features'][j]['properties']['name']=grid['features'][j]['properties']['vic_loca_2']
#==============================================================================
#                               MAIN PROGRAM
#==============================================================================
### DATA PREPROCESSING ###

# LOADING DATA #
#for larger datasets, will want to use a file stream
errors = {}
try:
    with open('suburbs.json', encoding="utf8") as grid_file:    
        grid = json.load(grid_file)
except:
    errors[len(errors)]='grid loading error'
try:
    with open('SuburbWorkingAgeEmploymentByIncome.json', encoding="utf8") as data_file:    
        data = json.load(data_file)
except:
    errors[len(errors)]='dataset loading error'

#with open('some.json', encoding="utf8") as some_file:    
#    someData = json.load(some_file)

# CONSTANTS AND VARIABLES #
MELBCENTRE = [144.9631,-37.8136]
suburbs=copy.deepcopy(grid)
stripSuburbs(suburbs)
try:
    with open('EmptySuburbs.json', 'w') as output_file:    
        output_file.write(json.dumps(suburbs))
except:
    errors[len(errors)]='output error'
    
#==============================================================================
### DATA PROCESSING ###

# WORKING AGE EMPLOYMENT DATA #
numFound=0
for j in range(len(suburbs['features'])):
    for i in range(len(data['features'])):
        if suburbs['features'][j]['properties']['name'].upper() == data['features'][i]['properties']['SSC_NAME'].upper():
            suburbs['features'][j]['properties']['name'] = data['features'][i]['properties']['SSC_NAME'].upper()
            suburbs['features'][j]['properties']['WorkingAgeEmployment']={}
            suburbs['features'][j]['properties']['WorkingAgeEmployment']=data['features'][i]['properties']
            print(data['features'][i]['properties']['SSC_NAME'] + suburbs['features'][j]['properties']['name'])
            numFound=numFound+1
#Adding blank entries for no data
for j in range(len(grid['features'])):
    try: 
        p = suburbs['features'][j]['properties']['WorkingAgeEmployment']
    except KeyError:
        #no working age employment data, add an empty entry
        suburbs['features'][j]['properties']['WorkingAgeEmployment']={}

#==============================================================================
### EXPORTING DATA ###
#For large files, we will need to think about where and how where we are exporting it

#FILEPATH = './folder/subfolder/'
try:
    with open('SuburbOutput.json', 'w') as output_file:    
        output_file.write(json.dumps(suburbs))
except:
    errors[len(errors)]='output error'
