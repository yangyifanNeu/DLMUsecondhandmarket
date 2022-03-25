var express = require("express");
const { getIdParam } = require("./helper/helper");
const { models } = require("../middleware/sequelize");
const userModel = models.user;
const codelistModel = models.codelist;
const { Op } = require("sequelize");
const url = require("url");
const { encryptString } = require("../tools/encryption");

var router = express.Router();
router.get("/getCodelist",async (_req, res) => {
  let name = _req.query.name;
  let codelist = await codelistModel.findAll({
    where:{
      name:name
    }
  });
  res.send(codelist);
});
router.post("/createCodelist",async (_req, res) => {
  let codelist = _req.body;
  let {name,codename,codevalue} = codelist;
  let result = await codelistModel.findOrCreate({
    where:{
      [Op.and]:[
        {name:name},
        {codename:codename},
        {codevalue:codevalue}
      ]
    },
    defaults:{
      name:name,
      codename:codename,
      codevalue:codevalue
    }
  })
  res.send(result);
});


module.exports = router;
