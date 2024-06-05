// Importing necessary dependencies
import express from "express";
import { signin, signup } from "../controllers/users.js";

const router = express.Router();

// Define POST route for user signup
router.post("/signup", signup); // When a POST request is made to "/signup", the signup controller function is executed

// Define POST route for user signin
router.post("/signin", signin); // When a POST request is made to "/signin", the signin controller function is executed

// Export the router to be used in other parts of the application
export default router;
