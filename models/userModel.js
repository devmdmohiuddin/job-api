const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 3,
      maxLength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please provide valid email",
      ],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// hash password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// creating a token
userSchema.methods.createJWT = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.LIFETIME,
  });

  return token;
};

// compare password
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);

  return isMatch;
};

const User = model("User", userSchema);

module.exports = User;
