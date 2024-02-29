const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcry = require("bcrypt");

//  @access Private
//  @desc Login Method
//  @path cpp/user/login
const login = asyncHandler(async (req, res) => {
  const { email, type, password } = req.body;
  if (!email || !type || !password)
    return res.send(400).json({ message: "Please provide all the details" });

  const user = await User.findOne({ email }).select("-refreshToken");
  if (user && (await bcry.compare(password, user.password))) {
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const details = {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      type: user.type,
    };
    return res.status(201).json({
      success: true,
      credentials: details,
      accessToken,
      refreshToken,
    });
  } else return res.send(400).json({ message: "Incorrect Email or Password" });
});

//  @access Private
//  @desc Logout Method
//  @path cpp/user/logout
const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );
});

//@access Private
//@desc Registered Method
//@path cpp/user
const register = asyncHandler(async (req, res) => {});

//@access Private
//@desc Refresh Access Token Method
//@path cpp/user/refreshToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { incomingRefreshToken } = req.body;
  if (!incomingRefreshToken)
    return res.status(401).json({ message: "Unauthorized Access" });

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = User.findById(decodedToken?._id);
    if (!user) return res.status(401).json({ message: "Unauthorized Access" });
    if (incomingRefreshToken !== user.refreshToken)
      return res
        .status(401)
        .json({ message: "Invalid or expired Refresh Token" });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    return res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Request" });
  }
});

module.exports = { register, login, logout, refreshAccessToken };
