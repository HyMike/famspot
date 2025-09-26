import express, {Router} from "express";
import {createUser} from "../controllers/signupController"

const router: Router = express.Router();

router.post("/signup", createUser);


export default router; 

// Store user data into database 
    // pool.query allows you to do queries with SQL and pg. will convert from javascript to SQL to SQL to javascript. 
// Each week retrieve this user data and run a cron job with openrouter 32


// I think you should create a database of events and add the zipcode of the event as metadata. 
// every week your cronjob will look for events in the zipcodes of your users and insert new data into your database of events.
//  after the cronjob has finished running, you can run another cronjob to send out an email to your users where you just query for the events with the user’s zipcode and that were added within this past week and sort by date_added.
//  that solves your problem of constantly displaying old data and surfaces new events in that users area. 


//  grab all the users and their zipcodes. 
// do a api call to openrouter to get events. 
//  extract events and store the events in the database with another table with user_id, event name, event url and created_at (this current)


// 2nd cron fetch from database. 
// craft email and send out to users. 
