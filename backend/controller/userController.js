import asyncHandler from "express-async-handler";
import generateToken from "../utils/JWT.js";
import User from "../models/users.js";
import url from "url";
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("email address has already been taken");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      watchList: user.watchList,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Register a new user
// @route   get /api/users
// @access  Public

const getUserDetails = asyncHandler(async (req, res) => {
  const { _id } = url.parse(req.url, true).query;
  const user = await User.findOne({ _id });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      watchList: user.watchList,
    });
  } else {
    res.status(400);
    throw new Error("user Not found");
  }
});

// @desc    add movie to watchList
// @route   POST /api/users/watchlist
// @access  private
const addToWatchList = asyncHandler(async (req, res) => {
  const { _id, data } = req.body;

  const user = await User.findOne({ _id });

  if (user) {
    let arr = user.watchList;
    arr.push(data);
    user.watchList = arr.filter(
      (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
    );
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      watchList: updatedUser.watchList,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    remove movie to watchList
// @route   POST /api/users/watchlist/remove
// @access  private
const removeFromWatchList = asyncHandler(async (req, res) => {
  const { _id, data } = req.body;
  const user = await User.findOne({ _id });

  if (user) {
    user.watchList = [];

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      updateWatchList: updatedUser.watchList,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  addToWatchList,
  removeFromWatchList,
  getUserDetails,
};
