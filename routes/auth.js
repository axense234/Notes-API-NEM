const express = require("express");

const router = express.Router();

// Controllers
const { loginUser, signUpUser } = require("../controllers/auth");

// Routes
/**
 * @swagger
 * /login:
 *  post:
 *   description: Route used for loggin in(getting the JWT).
 *   tags:
 *    - AUTH Routes
 *   consumes:
 *    - application/json
 *   parameters:
 *    - in: body
 *      name: Login body.
 *      description: Request body where you need to enter your email,username and password in order to log in and get your JWT.
 *      schema:
 *       $ref: "#components/schemas/Authorization"
 *   responses:
 *    "200":
 *     description: Everything went alright.Get the JWT.
 *    "400":
 *     description: Either there is no account with that email,the username of the account is wrong,passwords do not match.
 *    "404":
 *     description: You didn't fill the username/email/password.
 * */
router.post("/login", loginUser);

/**
 * @swagger
 * /signup:
 *  post:
 *   description: Route used for sign up(getting the JWT and creating your account).
 *   tags:
 *    - AUTH Routes
 *   consumes:
 *    - application/json
 *   parameters:
 *    - in: body
 *      name: Sign up body.
 *      description: Request body where you need to enter your email,username and password in order to create an account and get your JWT.
 *      schema:
 *       $ref: "#components/schemas/User"
 *   responses:
 *    "200":
 *     description: Everything went alright and you created an account.Get the JWT.
 *    "400":
 *     description: The information you introduced does not match the user schema.
 *    "404":
 *     description: There is no user body.
 * */
router.post("/signup", signUpUser);

// EXPORT
module.exports = router;
