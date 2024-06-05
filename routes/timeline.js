// Importing necessary dependencies
import express from "express";
import { getTweets } from "../controllers/tweets.js";

const router = express.Router();

// Define GET route for fetching tweets
router.get("/tweets", getTweets); // When a GET request is made to "/tweets", the getTweets controller function is executed

export default router;
