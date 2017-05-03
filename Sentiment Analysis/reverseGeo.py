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
import fiona
from shapely.geometry import shape, Point

#####----------------------------  CONSTANTS  ----------------------------#####

FILE_PATH = "reverseGeo_files/" 
SA2_CODES = FILE_PATH + "SA2_VIC_codes.csv" #CSV with suburb codes and names.
SA2_POLYG = FILE_PATH + "SA2_2016_AUST.shp" #SHP file with suburb polygon data.

#Constants to define the circle surrounding Melbourne CBD.
#Tweets from this area come from people of all socioeconomic backgrounds, as
#   well as many Twitter bots, and so shouldn't be used for language modelling.
CBD_RAD = 0.01                           #Radius.
CBD_PNT = Point(144.962281,-37.812868)   #Centre.
CBD_CIR = CBD_PNT.buffer(CBD_RAD)        #Circle.

#Following constants are to define radii over other areas.
#Advantaged: The University of Melbourne, Parkville.
UMELB_RAD = 0.005
UMELB_PNT = Point(144.961239,-37.796506)
UMELB_CIR = UMELB_PNT.buffer(UMELB_RAD)

#Advantaged: Kew and surrounds.
KEW_RAD = 0.035
KEW_PNT = Point(145.047368,-37.819064)
KEW_CIR = KEW_PNT.buffer(KEW_RAD)

#Advantaged: Hurstbridge and surrounds.
HUR_RAD = 0.055
HUR_PNT = Point(145.197081,-37.677381)
HUR_CIR = HUR_PNT.buffer(HUR_RAD)

#Advantaged: Macedon and surrounds.
MAC_RAD = 0.05
MAC_PNT = Point(144.619051,-37.433871)
MAC_CIR = MAC_PNT.buffer(MAC_RAD)

#Disadvantaged: Frankston/Cranbourne and surrounds.
FNK_RAD = 0.08
FNK_PNT = Point(145.211930,-38.130783)
FNK_CIR = FNK_PNT.buffer(FNK_RAD)

#Disadvantaged: Melton and surrounds.
MTN_RAD = 0.18
MTN_PNT = Point(144.602315,-37.734015)
MTN_CIR = MTN_PNT.buffer(MTN_RAD)

#Disadvantaged: Craigieburn and surrounds.
CRG_RAD = 0.08
CRG_PNT = Point(144.958355,-37.590396)
CRG_CIR = CRG_PNT.buffer(CRG_RAD) 

#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to classify coordinates based on socioeconomic standing.
#   Ignores unwanted tweets.
def socioec(lat, lng):
    point = Point(lng, lat)
    if CBD_CIR.contains(point):
        return None
    if UMELB_CIR.contains(point) or KEW_CIR.contains(point) or \
         HUR_CIR.contains(point) or MAC_CIR.contains(point):
        return 1
    if FNK_CIR.contains(point) or MTN_CIR.contains(point) or \
       CRG_CIR.contains(point):
        return 0

#Function to find the SA2 (suburb) code for given latitude and longitude.
def sa2_code(lat, lng):
    for (code,poly) in suburb_list:
        if poly.contains(Point(lng,lat)):
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
    suburb_names[None] = "None"

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