# -*- coding: utf-8 -*-
"""
Created on Sun May  7 00:13:13 2017

@author: DMori
"""



import json
import math

#==============================================================================
### DATA PREPROCESSING ###

jsonfile = 'SA2Masterfile.json'
# LOADING DATA #
#for larger datasets, will want to use a file stream
errors = {}
try:
    with open(jsonfile, encoding="utf8") as grid_file:    
        grid = json.load(grid_file)
except:
    errors[len(errors)]='grid loading error'

# LOWERING THE RESOLUTION
#descale = 2; #reduces by 50%
#descale = 3; #eliminates a quarter of the polygon coordinates
descale = 5;
for i in range(len(grid['features'])):
    try:
        length = len(grid['features'][i]['geometry']['coordinates'][0])
        j=0
        while (j < length):
            if (j%descale ==0):
                del(grid['features'][i]['geometry']['coordinates'][0][j])
                length=length-1
            j=j+1    
    except TypeError:
        pass
#connecting the front and back coords to make a full loop
for i in range(len(grid['features'])):
    try:
        grid['features'][i]['geometry']['coordinates'][0].append(grid['features'][i]['geometry']['coordinates'][0][0])
    except:
        pass
    
try:
    with open(jsonfile+'(LOSSY).json', 'w') as output_file:    
        output_file.write(json.dumps(grid))
except:
    errors[len(errors)]='output error'
#==============================================================================
### HOUSEKEEPING ###
with open('???.json', encoding="utf8") as file:    
        empty = json.load(file)
        
len(grid['features'])
len(empty['features'])