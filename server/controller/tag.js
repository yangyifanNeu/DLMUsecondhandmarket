var express = require("express");
const { getIdParam } = require("./helper/helper");
const { models } = require("../middleware/sequelize");
const userModel = models.user;
const tag = models.tag;
const { Op } = require("sequelize");
const url = require("url");
const { encryptString } = require("../tools/encryption");

var router = express.Router();
router.post("/createTag",async (_req, res) => {
  let tagObj = _req.body;
  let result = await tag.create(tagObj)
  res.send(result);
});
router.get("/allTags",async (_req, res) => {
  let result = await tag.findAll();
  res.send(result);
});

module.exports = router;
