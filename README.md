# Twitter-Analytics
Analysis of harvested Twitter data - web application

A program for hosting an interactive ReSTful web application on the NeCTAR cloud within the Javascript React framework, to visualize Data Analysis scenarios of a Twitter Big Data space.

A demo of the working program is visible at: ....

The web application allows the user to navigate between different interactive data analysis scenarios that were undertaken upon the harvested tweets:
* Scenario 1 - Sentiment Analysis
* Scenario 2 - User Movement and Tracking
* Scenario 3 - Language Modelling

Using our cloud-based database, the program also incorporates persistent twitter data as it continues to be harvested, configured as a CouchDB view object, and fed into the application front end in JSON format.

The application requires installation of node.js, npm, and a number of package dependencies, 
some of which may not entirely be listed within the depency json.
The application, originally served on one of our Virtual Machine nodes, is accessible within a browser using the URL localhost:3000 but only after using the 'npm start' command within the 'web' directory.


NOTE: Contract for the virtual machines has since expired, and so has routine maintenance and upkeep of the program, hence the program will fail to work entirely even when hosted locally, as the data is no longer suppliable.
