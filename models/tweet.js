import mongoose, { Schema } from "mongoose";
import User from "./user.js";

// Define the schema for a Tweet
const tweetSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, default: "" },
  createdAt: { type: Date, required: true, default: Date.now },
});

// Create and export a Mongoose model based on the tweet schema
export default mongoose.model("Tweet", tweetSchema);
