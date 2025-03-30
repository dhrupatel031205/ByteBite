import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../libs/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All feilds are required " });
    }
    // hash password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "passwrod length must be at least 6 " });
    }

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "Email is already exists " });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "invalid User data" });
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Normalize email to lowercase for consistency
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
      
    }

    const isPasswordTrue = await bcrypt.compare(password, user.password);

    if (!isPasswordTrue) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      res.status(400).json({ message: "Profile Pic is required" });
    }

    const uploadPic = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadPic.secure_url },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log("Error in update profile controller : ", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const checkAuth = (req, res) => {
  try {
    req.status(200).json(req.user);
  } catch (error) {
    console.log("Error in update checkAuth controller : ", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
};
