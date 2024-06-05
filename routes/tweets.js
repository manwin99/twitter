// Importing necessary dependencies
import express from "express";
import { addTweet } from "../controllers/tweets.js";

const router = express.Router();

// Define POST route for adding a tweet
router.post("/addTweet", addTweet); // When a POST request is made to "/addTweet", the addTweet controller function is executed

export default router; // Export the router to be used in other parts of the application
