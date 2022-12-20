const express = require("express");

const router = express.Router();

// Controllers and Middleware
const {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} = require("../controllers/notes");
const { AuthenticationMiddleware } = require("../middleware/Authentication");

// Routes
/**
 * @swagger
 * /notes/all/{userId}?limit&fields&skip&title&sort:
 *  get:
 *   security:
 *    - bearerAuth: []
 *   description: Route used for getting all of an user routes.
 *   tags:
 *   - GET Routes
 *   parameters:
 *    - in: path
 *      name: userId
 *      description: The id of the user you want to get the notes of.
 *      schema:
 *       type: string
 *    - in: query
 *      name: limit
 *      description: The max number of notes you want to receive.
 *      schema:
 *       type: string
 *    - in: query
 *      name: fields
 *      description: The list of the properties of the notes you only want to receive,example -> createdBy,title
 *      schema:
 *       type: string
 *    - in: query
 *      name: page
 *      description: The page number,example -> 2
 *      schema:
 *       type: string
 *    - in: query
 *      name: sort
 *      description: The sort order,example -> title,createdAt
 *      schema:
 *       type: string
 *    - in: query
 *      name: title
 *      description: The title of the notes you want to receive.
 *      schema:
 *       type: string
 *   responses:
 *    "200":
 *     description: Everything went alright and you got the notes of the user.
 *    "404":
 *     description: Either you didn't enter an userId or the user has no notes.
 *
 */

router.get("/notes/all/:userId", AuthenticationMiddleware, getAllNotes);

/**
 * @swagger
 * /notes/{noteId}:
 *  get:
 *   security:
 *    - bearerAuth: []
 *   description: Route used for getting a note by id.
 *   tags:
 *   - GET Routes
 *   parameters:
 *    - in: path
 *      name: noteId
 *      description: The id of the note you want to get.
 *      schema:
 *       type: string
 *   responses:
 *    "200":
 *     description: Everything went alright and you got note with the id.
 *    "404":
 *     description: Either you didn't enter an noteId or the user or the note doesn't exist.
 *  patch:
 *   security:
 *    - bearerAuth: []
 *   description: Route used for updating an note by id.
 *   tags:
 *   - UPDATE Routes
 *   parameters:
 *    - in: path
 *      name: noteId
 *      description: The id of the note you want to update.
 *      schema:
 *       type: string
 *    - in: body
 *      name: Update Body
 *      description: The body with new note properties.
 *      schema:
 *       $ref: "#components/schemas/Note"
 *   responses:
 *    "200":
 *     description: Everything went alright and you updated the note with the id.
 *    "404":
 *     description: Either there is no noteId or no noteBody
 *    "400":
 *     description: Either note validation failed in the body or the note you wanted to update was not found.
 *  delete:
 *   security:
 *    - bearerAuth: []
 *   description: Route used for deleting a note by id.
 *   tags:
 *   - DELETE Routes
 *   parameters:
 *    - in: path
 *      name: noteId
 *      description: The id of the note you want to delete.
 *      schema:
 *       type: string
 *   responses:
 *    "200":
 *     description: Everything went alright and you deleted the note with the id.
 *    "404":
 *     description: There is no noteId.
 *    "400":
 *     description: Probably we could not find the note you wanted to delete it by using that noteId.
 */
router.get("/notes/:noteId", AuthenticationMiddleware, getNoteById);

router.patch("/notes/:noteId", AuthenticationMiddleware, updateNoteById);

router.delete("/notes/:noteId", AuthenticationMiddleware, deleteNoteById);

/**
 * @swagger
 * /notes/create:
 *  post:
 *   security:
 *    - bearerAuth: []
 *   description: Route in used to create a note.
 *   tags:
 *    - CREATE Routes
 *   consumes:
 *    - application/json
 *   parameters:
 *    - in: body
 *      name: Note Body.
 *      required: true
 *      description: The request body of the note you want to create.
 *      schema:
 *       $ref: "#components/schemas/Note"
 *   responses:
 *    "201":
 *     description: You created a note!
 *    "400":
 *     description: Invalid request body.
 *    "404":
 *     description: The request body was not found.
 */

router.post("/notes/create", AuthenticationMiddleware, createNote);

// EXPORT
module.exports = router;
