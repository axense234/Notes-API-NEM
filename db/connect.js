const mongoose = require("mongoose");

const connectDB = async (URI) => {
  mongoose.connect(URI);
};

module.exports = connectDB;
