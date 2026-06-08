const express = require("express");
const router = express.Router();
const Controller = require("../controllers/lookupControlls");

router.route("/categories").get(Controller.getAllCategories);
router.route("/prices").get(Controller.getAllPriceLevels);
router.route("/skill-levels").get(Controller.getAllSkillLevels);
router.route("/languages").get(Controller.getAllLanguages);

module.exports = router;
