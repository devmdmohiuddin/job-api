const jwt = require("jsonwebtoken");
const { Unauthorize } = require("../errors");
const User = require("../models/userModel");

const protected = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    throw new Unauthorize("No token, authentication failed");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(payload.userID).select("-password")

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = protected;
