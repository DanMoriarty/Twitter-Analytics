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

#Constants to define tweets from around Melbourne University.
UMELB_RAD = 0.005                           #Radius.
UMELB_PNT = Point(144.961239,-37.796506)    #Centre.
UMELB_CIR = UMELB_PNT.buffer(UMELB_RAD)     #Circle.

#Constants to define the circle of high socioeconomic south-eastern suburbs.
H_SOC_RAD = 0.1                             #Radius.
H_SOC_PNT = Point(145.152422,-37.821044)    #Centre.
H_SOC_CIR = H_SOC_PNT.buffer(H_SOC_RAD)     #Circle.

#Constants to define the circle surrounding Melbourne CBD.
#Tweets from this area come from people of all socioeconomic backgrounds, as
#   well as many Twitter bots, and so shouldn't be used for language modelling.
M_BOT_RAD = 0.01                            #Radius.
M_BOT_PNT = Point(144.962281,-37.812868)    #Centre.
M_BOT_CIR = M_BOT_PNT.buffer(M_BOT_RAD)     #Circle.

F_RAD = 0.01                            #Radius.
F_PNT = Point(145.137346,-38.159962)    #Centre.
F_CIR = F_PNT.buffer(F_RAD)             #Circle.

R_RAD = 0.1                             #Radius.
R_PNT = Point(144.625434,-37.742180)    #Centre.
R_CIR = R_PNT.buffer(R_RAD)             #Circle.


#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to classify coordinates based on socioeconomic standing.
#   Ignores unwanted tweets.
def socioec(lat, lng):
    point = Point(lng, lat)
    if M_BOT_CIR.contains(point):
        return None
    if UMELB_CIR.contains(point) or H_SOC_CIR.contains(point):
        return 1
    if F_CIR.contains(point) or R_CIR.contains(point):
        return -1
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