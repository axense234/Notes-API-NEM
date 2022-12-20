const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: [3, "Please provide a longer username."],
      maxLength: [15, "Please provide a shorter username."],
      required: [true, "Please provide a username."],
    },
    email: {
      type: String,
      // Regex for email
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email.",
      ],
      unique: [true, "Please provide an unique email!"],
      required: [true, "Please provide an email."],
    },
    password: {
      type: String,
      minLength: [9, "Please provide a longer password."],
      maxLength: [40, "Please provide a shorter password."],
      required: [true, "Please provide a password."],
    },
    notesDeleted: {
      type: Array,
      // An array of the user's deleted notes
      default: [],
    },
    notesFavorited: {
      type: Array,
      // An array of the user's favorite notes
      default: [],
    },
    // Add more properties as needed later
  },
  { timestamps: true }
);

// ENCRYPT PASSWORD BEFORE SAVING
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);
});

// CREATE JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );
};

// COMPARE ENCRYPTED PASSWORD WITH GIVEN PASSWORD
UserSchema.methods.comparePasswords = async function (pass) {
  const matchingPassword = await bcrypt.compare(pass, this.password);
  return matchingPassword;
};

module.exports = mongoose.model("Users", UserSchema);
