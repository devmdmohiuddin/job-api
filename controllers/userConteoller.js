const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthorize } = require("../errors");
const User = require("../models/userModel");

const register = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new BadRequest("User already exist.");
  }

  // user create
  const registerUser = await User.create({ ...req.body });

  // token create
  const token = registerUser.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", data: { registerUser, token } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  // checking user credentials
  const user = await User.findOne({ email });
  console.log(user);
  if (!user || !(await user.comparePassword(password))) {
    throw new Unauthorize("Please give valid credentials");
  }

  // token create
  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ status: "success", data: { loginUser: user, token } });
};

module.exports = {
  register,
  login,
};
