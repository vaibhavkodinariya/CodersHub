const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcry = require("bcrypt");

const generateAccessAndRefreshToken = async () => {
  try {
    const user = await User.findOne();
    const accessToken = await generateAccessToken();
    const refreshToken = await generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    res.send(500).json({ message: "Something Went Wrong!" });
  }
};

//@access Private
//@desc Login Method
//@path cpp/user/login
const login = asyncHandler(async (req, res) => {
  const { email, type, password } = req.body;
  if (!email || !type || !password)
    return res.send(400).json({ message: "Please provide all the details" });

  try {
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
    } else
      return res.send(400).json({ message: "Incorrect Email or Password" });
  } catch (error) {
    return res.send(500).json({ message: "Bad Request" });
  }
});

//@access Private
//@desc Logout Method
//@path cpp/user/logout
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
  return res.status(200).json({ message: "Logged out Successfully." });
});

//@access Private
//@desc Registered Method
//@path cpp/user
const register = asyncHandler(async (req, res) => {
  const {
    instituteName,
    contactNumber,
    pincode,
    password,
    email,
    city,
    state,
    address,
  } = req.body;

  if (
    !instituteName &&
    !contactNumber &&
    !pincode &&
    !password &&
    !email &&
    !city &&
    !state &&
    !address
  ) {
    return res.status(400).send("Please fill all fields");
  } else {
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email Already Registered" });
      } else {
        const salt = await bcry.genSalt(10);
        const hashPassword = await bcry.hash(password, salt);
        const createdUser = await User.create({
          institute: instituteName,
          contactNumber: contactNumber,
          address: address,
          email: email,
          password: hashPassword,
          pincode: pincode,
          city: city,
          state: state,
          isInstitute: true,
        });
        if (createdUser)
          return res.status(201).json({ message: "User Created" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Bad Request" });
    }
  }
});

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
    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Request" });
  }
});

module.exports = { register, login, logout, refreshAccessToken };
