#!/usr/bin/env python
#coding: utf-8
#####---------------------------- DESCRIPTION ----------------------------#####

#    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
#    Course:    COMP90024 Cluster and Cloud Computing
#    Project:   Melbourne Twitter analytics
#    Purpose:   To find containing SA2 area codes given lat/long coordinates
#    Modified:  26/04/2017

#####----------------------------   IMPORTS   ----------------------------#####

import csv
from shapely.geometry import shape, Point
import fiona

#####----------------------------  CONSTANTS  ----------------------------#####

FILE_PATH = "reverseGeo_files/" 
SA2_CODES = FILE_PATH + "SA2_VIC_codes.csv"
SA2_POLYG = FILE_PATH + "SA2_2016_AUST.shp"

#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to find the SA2 (suburb) code for given latitude and longitude.
def sa2_code(lat, lng):
    for (code,poly) in suburb_list:
        coords = Point(lng, lat)
        if poly.contains(coords):
            return code
    return None
    
#Function to return the SA2 name for a given SA2 code.
def sa2_name(code):
    return suburb_names[code]

#####----------------------------   PROGRAM   ----------------------------##### 

#Create a dictionary of suburb SA2 codes to names.
suburb_names = {}
with open(SA2_CODES) as sa2_codes:
    suburb_names = {rows[0]:rows[1] for rows in csv.reader(sa2_codes)}

#Create a list of suburb (SA2_code, polygon) tuples.
suburb_list = []
with fiona.open(SA2_POLYG) as suburbs:
    for s in suburbs:
        #Skip suburb if not in Victoria, or has no associated geometry.
        if s["properties"]["STE_NAME16"]!="Victoria" or s["geometry"]==None:
            continue
        
        #Obtain polygon and SA2 code for suburb, and append to list.      
        suburb_list.append((s["properties"]["SA2_MAIN16"], shape(s["geometry"])))

#####----------------------------  END  FILE  ----------------------------#####