const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

// CREATE USER(SIGN UP USER)
const signUpUser = async (req, res) => {
  const { ...userBody } = req.body;
  console.log(userBody);

  if (!userBody) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find request body.", user: {}, token: "" });
  }

  console.log("yes queen");

  const createdUser = await User.create(userBody);

  if (!createdUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not sign up user,please try again with different information.",
      user: {},
      token: "",
    });
  }

  const token = createdUser.createJWT();

  return res.status(StatusCodes.CREATED).json({
    msg: `Succesfully signed up user with id:${createdUser._id}`,
    user: createdUser,
    token,
  });
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { ...loginDetails } = req.body;
  const { password, username, email } = loginDetails;
  console.log(loginDetails, req.body);

  if (!password || !username || !email) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Password,email or username cannot be empty!",
      user: {},
      token: "",
    });
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Could not find any users with the email:${email}.`,
      user: {},
      token: "",
    });
  }

  if (foundUser.username !== username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Usernames do not match!", user: {}, token: "" });
  }

  const matchingPassword = await foundUser.comparePasswords(password);

  if (!matchingPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Passwords do not match!", user: {}, token: "" });
  }

  const token = foundUser.createJWT();

  return res.status(StatusCodes.OK).json({
    msg: `Successfully logged in user with id:${foundUser._id}.`,
    user: foundUser,
    token,
  });
};

// EXPORT
module.exports = { signUpUser, loginUser };
