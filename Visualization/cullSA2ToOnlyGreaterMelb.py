# -*- coding: utf-8 -*-
"""
Created on Sun May  7 00:18:58 2017

@author: DMori
"""

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

centre = [-37.962932, 144.900115] #point in the bay
furthest=[-37.277660, 144.944060] #furthest point away
threshold = max(abs(centre[0]-furthest[0]),abs(centre[1]-furthest[1])) #maximum acceptable radial distance
lat =centre[0]
long =centre[1]
unchanged=False
#if first coordinate above threshold distance, delete the suburb
while (not unchanged):
    unchanged = True
    for i in range(len(grid['features'])):
        print(i)
        try:
            if math.sqrt(math.pow(grid['features'][i]['geometry']['coordinates'][0][0][0] - long,2)+ math.pow(grid['features'][i]['geometry']['coordinates'][0][0][1] - lat,2))>threshold:
                del(grid['features'][i])
                i=0
                print('BREAK')
                unchanged=False
        #some have meta-coordinates        
        except:
            try:
                if math.sqrt(math.pow(grid['features'][i]['geometry']['coordinates'][0][0][0][0] - long,2)+ math.pow(grid['features'][i]['geometry']['coordinates'][0][0][0][1] - lat,2))>threshold:
                    del(grid['features'][i])
                    i=0
                    print('BREAK')
                    unchanged=False
            except:
                pass

    
try:
    with open(jsonfile+'(MELB).json', 'w') as output_file:    
        output_file.write(json.dumps(grid))
except:
    errors[len(errors)]='output error'
#==============================================================================
### HOUSEKEEPING ###
with open('???.json', encoding="utf8") as file:    
        empty = json.load(file)
        
len(grid['features'])
len(empty['features'])