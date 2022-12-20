const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  const foundUsers = await User.find({});

  if (foundUsers.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find any users.", users: [] });
  }

  return res
    .status(StatusCodes.OK)
    .json({
      msg: "Found users.",
      nbHits: foundUsers.length,
      users: foundUsers,
    });
};

// GET USER BY ID/JWT
const getUserByIdOrJWT = async (req, res) => {
  const { userId } = req.params || req.user;

  if (!userId) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find user id.", user: {} });
  }

  const foundUser = await User.findById(userId);

  if (!foundUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any users with the id:${userId}.`,
      user: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found user with id:${userId}.`,
    user: foundUser,
  });
};

// UPDATE USER BY ID/JWT
const updateUserByIdOrJWT = async (req, res) => {
  const { userId } = req.params || req.user;
  const { ...userBody } = req.body;

  if (!userId || !userBody) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find user id or the request body.", user: {} });
  }

  const updatedUser = await User.findByIdAndUpdate(userId, userBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Could not find user with id:${userId} in order to update it.`,
      user: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated user with id:${userId}.`,
    user: updatedUser,
  });
};

// DELETE USER BY ID/JWT
const deleteUserByIdOrJWT = async (req, res) => {
  const { userId } = req.params || req.user;

  if (!userId) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Could not find user with id:${userId}.`, user: {} });
  }

  const deletedUser = await User.findByIdAndDelete(userId, {
    new: true,
    runValidators: true,
  });

  if (!deletedUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Could not find user with id:${userId}.`, user: {} });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted user with id:${userId}.`,
    user: deletedUser,
  });
};

// EXPORTS
module.exports = {
  getAllUsers,
  getUserByIdOrJWT,
  updateUserByIdOrJWT,
  deleteUserByIdOrJWT,
};
