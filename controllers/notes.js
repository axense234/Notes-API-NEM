const { StatusCodes } = require("http-status-codes");
const Note = require("../models/Note");

// GET ALL NOTES
const getAllNotes = async (req, res) => {
  const { userId } = req.params;
  const { limit, fields, page, title, sort } = req.query;

  if (!userId || userId === "undefined") {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Please provide an user id.", notes: [] });
  }

  // QUERY OBJECT
  const queryObject = { createdBy: userId };

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  const limitNumber = limit || 10;
  const pageNumber = page || 1;
  const skipNumber = (pageNumber - 1) * limitNumber;
  // ex: limit: 23,page: 2 ==> 1 * 23 so skip the first 23 numbers

  console.log(queryObject);
  let foundNotes = Note.find(queryObject).limit(limitNumber).skip(skipNumber);

  if (sort) {
    const filteredSort = sort.split(",").join(" ");
    foundNotes = foundNotes.sort(filteredSort);
  } else {
    foundNotes = foundNotes.sort("title");
  }

  if (fields) {
    const filteredFields = fields.split(",").join(" ");
    foundNotes = foundNotes.select(filteredFields);
  }

  const foundNotesResult = await foundNotes;

  if (foundNotesResult.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find any notes.", notes: [] });
  }

  return res.status(StatusCodes.OK).json({
    msg: "Found notes.",
    nbHits: foundNotesResult.length,
    notes: foundNotesResult,
  });
};

// GET NOTE BY ID
const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  if (!noteId) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Note id was not found.", note: {} });
  }
  const foundNote = await Note.findById(noteId);
  if (!foundNote) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Could not find note with id:${noteId}.`, note: {} });
  }

  return res
    .status(StatusCodes.OK)
    .json({ msg: `Found note with id:${noteId}.`, note: foundNote });
};

// CREATE NOTE
const createNote = async (req, res) => {
  const { ...noteBody } = req.body;

  if (!noteBody) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Request body not found.", note: {} });
  }

  const createdNote = await Note.create(noteBody);

  if (!createdNote) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Invalid request body,please try again with different note properties.",
      note: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created note with id:${createdNote._id}.`,
    note: createdNote,
  });
};

// UPDATE NOTE BY ID
const updateNoteById = async (req, res) => {
  const { ...noteBody } = req.body;
  const { noteId } = req.params;

  if (!noteId || !noteBody) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Request body or note id could not be found.", note: {} });
  }

  const updatedNote = await Note.findByIdAndUpdate(noteId, noteBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedNote) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Invalid request body or id,please try again with a different request body/id.",
      note: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfuly updated note with id:${noteId}.`,
    note: updatedNote,
  });
};

// DELETE NOTE BY ID
const deleteNoteById = async (req, res) => {
  const { noteId } = req.params;

  if (!noteId) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find note id.", note: {} });
  }

  const deletedNote = await Note.findByIdAndDelete(noteId, {
    new: true,
    runValidators: true,
  });

  if (!deletedNote) {
    return req
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Could not delete note with id:${noteId}.`, note: {} });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted note with id:${noteId}.`,
    note: deletedNote,
  });
};

// EXPORTS
module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNoteById,
  deleteNoteById,
};
