const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: [3, "Please provide a longer title name."],
      maxLength: [15, "Please provide a shorter title name."],
      required: [true, "Please provide a title."],
    },
    content: {
      type: String,
      minLength: [8, "Please provide longer content."],
      maxLength: [450, "Please provide shorter content."],
      required: [true, "Please provide note content."],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      rel: "User",
      required: [true, "Please provide an user id."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", NoteSchema);
