const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");
const User = require("../models/userModel");

const register = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new BadRequest("User already exist.");
  }

  const createdUser = await User.create({ ...req.body });

  const token = createdUser.createToken();

  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", data: { createdUser, token } });
};

const login = (req, res) => {
  res.send("Login user");
};

module.exports = {
  register,
  login,
};
