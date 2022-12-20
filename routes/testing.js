const express = require("express");

const router = express.Router();

// Controllers and Middleware
const {
  deleteAll,
  insertTemplateNotes,
  insertTemplateUsers,
  updateAll,
} = require("../controllers/testing");
const { AuthenticationMiddleware } = require("../middleware/Authentication");

// Routes
router.post("/notes/template", AuthenticationMiddleware, insertTemplateNotes);
router.post("/users/template", AuthenticationMiddleware, insertTemplateUsers);

router.delete("/delete-all", AuthenticationMiddleware, deleteAll);

router.patch("/update-all", AuthenticationMiddleware, updateAll);

// EXPORT
module.exports = router;
