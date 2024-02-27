const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");
const bcry = require("bcrypt");

//  @access Private
//  @desc Login Method
//  @path cpp/user/login
const Login = asyncHandler(async (req, res) => {
  const { email, type, password } = req.body;
  if (!email || !type || !password)
    return res.send(400).json({ message: "Please provide all the details" });

  let user = await User.findOne({ email });
  if (user && (await bcry.compare(password, user.password))) {
  } else return res.send(400).json({ message: "Incorrect Email or Password" });
});

module.exports = { Login };
