import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Controller function for user signin
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Search for the existing user in the database using email
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res
        .status(401)
        .json({ message: "This user does'nt exist", unsuccessful: true });
    
    // Compare the provided password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({ message: "Invalid credentials", unsuccessful: true });
    
    // Generate a JWT token with user email and id, valid for 1 hour
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    
    // Respond with user data and token
    res.status(200).json({ result: existingUser, token, message: "yes" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", unsuccessful: true });
  }
};


// Controller function for user signup
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(401)
        .json({ message: "Sorry, User already exists", unsuccessful: true });

    if (password !== confirmPassword)
      return res
        .status(401)
        .json({ message: "The passwords does not match", unsuccessful: true });
    
    // Hash the password with a difficulty level of 12
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create a new user in the database
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // Generate a JWT token with user email and id, valid for 1 hour
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    // Respond with the created user data and token
    res.status(200).json({ result, token, message: "yes" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Oops something went wrong", unsuccessful: true });
  }
};
