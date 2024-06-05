import mongoose from "mongoose";

// Define the schema for a User
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Create and export a Mongoose model based on the user schema
export default mongoose.model("User", userSchema);
