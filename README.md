# Radish/Turnip 3.0

## Gettings Set Up
Create a folder whenever you want to house the code, and follow the following steps.

1. Clone Repository 
> `git clone https://github.com/Jereck/radish.git .`

2. Change direcotry to 'backend'
3. Then run 'npm install'
> `npm install`

4. Change directory to 'porkarus'
5. Run 'npm install'
> `npm install`

## About this code
---
### Backend
The backend API was built on Node.js and Express and hooked up to the Database using SQL and mssql package.

Folder Structure
* api - houses the api
  * controllers - houses all the business logic for each route
  * routes - houses all the routes for the API
* server.js - the main file that runs everything
* database.js - the SQL code for injecting the data into the database

### porkarus : Frontend application code
This is the frontend code built on React (a javascript framework) and Redux for state management

Folder Structure
* src - houses all the main code
  * actions - actions are the event's that occur in the app based on user input and updates state
  * Pages - these are the "Views" that users see
  * reducers - functions that receive the current state and an action, and updates the state
  * store - an object that the application state lives in
* App.js - the main "View" of the application that connects all the other views
* index.js - this is the main file of the application

## Running the Application
---
In one terminal, change the directory to the "backend" folder and run 
> `npm run dev`

In another terminal, change the directory to "porkarus" and run
> `npm run start`