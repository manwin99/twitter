import express from "express"; // Importing the Express framework for building web applications
import mongoose from "mongoose"; // Importing Mongoose for interacting with MongoDB
import dotenv from "dotenv"; // Importing dotenv to load environment variables from a .env file
import cors from "cors"; // Importing CORS middleware to enable Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Importing body-parser to parse incoming request bodies
import userRoutes from "./routes/users.js"; // Importing user-related routes
import tweetRoutes from "./routes/tweets.js"; // Importing tweet-related routes
import timeLineRoutes from "./routes/timeline.js"; // Importing timeline-related routes

dotenv.config(); // Load environment variables from .env file

// Initialize an Express application
const app = express(); 
app.use(cors());

// Set up body-parser middleware to handle JSON and URL-encoded data with a size limit of 30mb
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Define routes for different functionalities
app.use("/users", userRoutes);
app.use("/tweets", tweetRoutes);
app.use("/getTimeline", timeLineRoutes);

// Get variables from environment variables
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

// Connect to MongoDB using Mongoose and start the server
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`app running on port : ${PORT}`))
  )
  .catch((err) => console.log(err));


