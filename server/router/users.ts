import express, {Router} from "express";
import {createUser} from "../controllers/signupController"

const router: Router = express.Router();

router.post("/signup", createUser);


export default router; 

// Store user data into database 
//  how do I store and work with data with postgreSQL and node.js and express.
    //  using pool to be able to make connections multiple. 
    // pool.query allows you to do queries with SQL and pg. will convert from javascript to SQL to SQL to javascript. 
// Each week retrieve this user data and run a cron job with openrouter 32