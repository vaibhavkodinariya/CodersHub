const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Unauthorized User" });
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user)
      return res.status(401).send({ message: "Invalid Token or User!" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid Token or User!" });
  }
});

module.exports = { verifyJWT };
