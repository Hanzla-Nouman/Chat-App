import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    // const fullname = req.body.fullname;
    // const username = req.body.username;
    // const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;
    // const gender = req.body.gender;

    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username alraedy exists" });
    }

    // HASH password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate jwt token here
      generateTokenandSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        fullname: newUser.fullname,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.log("Error in signup controller\n" , err.message);
    res.status(500).json({ error: "Internal server Error of signup" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    generateTokenandSetCookie(user._id, res);
    res.status(200).json({
        _id: user.id,
        username: user.username,
        fullname: user.fullname,
        profilePic: user.profilePic,
      });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server Error of login" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server Error of login" });
  }
};
