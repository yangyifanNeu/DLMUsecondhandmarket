var express = require("express");
const { getIdParam } = require("./helper/helper");
const { models } = require("../middleware/sequelize");
const userModel = models.user;
const pcategory = models.pcategory;
const { Op } = require("sequelize");
const url = require("url");
const { encryptString } = require("../tools/encryption");

var router = express.Router();
router.get("/getCategory",async (_req, res) => {
  let category = await pcategory.findAll();
  res.send(category);
});


module.exports = router;
