import Tweet from "../models/tweet.js";
import mongoose from "mongoose";
import User from "../models/user.js";

// Controller function for adding a tweet
export const addTweet = async (req, res) => {
  const { userId, text } = req.body;

  try {
    // Check if the user exists
    const user = User.findOne({ userId });
    if (!user) {
      res.status(401).json({ message: "user not found" });
    }

    // Create a new tweet in the database
    const tweet = await Tweet.create({
      userId,
      text,
    });

    // Respond with the created tweet
    res.status(200).json({ tweet, message: "created successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};



// Controller function for fetching tweets
export const getTweets = async (req, res) => {
  const { userId, pageNo } = req.query;
  let _id = userId;

  // Check if the user ID is in a valid format
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    // Find the user by ID
    const user = await User.findById({ _id });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const limit = 10;
    const startIndex = (Number(pageNo) - 1) * limit;
    const total = await Tweet.countDocuments({ userId });

    // Fetch tweets for the user, sorted by createdAt, paginated, and limited
    const tweets = await Tweet.find({ userId })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Respond with fetched tweets and total count
    res.status(200).json({ tweets, total });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
