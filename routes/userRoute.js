const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userController");

router.route("/").get(Controller.getAllUsers).post(Controller.createUser);
router
  .route("/:id")
  .get(Controller.getUserById)
  .put(Controller.updateUser)
  .delete(Controller.deleteUser);

module.exports = router;
