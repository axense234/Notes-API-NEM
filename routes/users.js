const express = require("express");

const router = express.Router();

// Controllers and Middleware
const {
  deleteUserByIdOrJWT,
  getAllUsers,
  getUserByIdOrJWT,
  updateUserByIdOrJWT,
} = require("../controllers/users");
const { AuthenticationMiddleware } = require("../middleware/Authentication");

// Routes
/**
 * @swagger
 * /users:
 *  get:
 *   description: Route used for getting all the users
 *   tags:
 *    - GET Routes
 *   responses:
 *    "200":
 *     description: Found the users! Yay!
 *    "404":
 *     description: No users could be found! Meh!
 */

router.get("/users", AuthenticationMiddleware, getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *   description: Route used for getting a single user by id.
 *   tags:
 *    - GET Routes
 *   parameters:
 *    - in: path
 *      name: userId
 *      description: The id of the user you want to get.
 *      schema:
 *       type: string
 *   responses:
 *    "200":
 *     description: Successfully fetched the user.
 *    "404":
 *     description: Could not find the user id or the user with the id.
 *  patch:
 *   description: Route used for updating a user by id.
 *   tags:
 *    - UPDATE Routes
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: userId
 *      description: The id of the user you want to update.
 *      schema:
 *       type: string
 *    - in: body
 *      name: Update Body
 *      description: The request body of the user you want to update.
 *      schema:
 *       $ref: "#components/schemas/User"
 *   responses:
 *    "200":
 *     description: Successfully updated the user.
 *    "404":
 *     description: Could not find the user id.
 *    "400":
 *     description: Could not find the user or the request body was invalid.
 *  delete:
 *   description: Route used for deleting a user.
 *   security:
 *    - bearerAuth: []
 *   tags:
 *    - DELETE Routes
 *   parameters:
 *    - in: path
 *      name: userId
 *      description: The id of the user you want to delete
 *      schema:
 *       type: string
 *   responses:
 *    "200":
 *     description: Successfully deleted the user with the id.
 *    "404":
 *     description: Either we could not find the user to delete it with the id or the id itself wasnt provided.
 */
router.get("/users/:userId", AuthenticationMiddleware, getUserByIdOrJWT);

router.patch("/users/:userId", AuthenticationMiddleware, updateUserByIdOrJWT);

router.delete("/users/:userId", AuthenticationMiddleware, deleteUserByIdOrJWT);

// EXPORT
module.exports = router;
