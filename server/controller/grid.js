var express = require('express');
var router = express.Router();
const menuData = require("../mockData/menuData.json");
const gridData = require("../mockData/grid/gridData.json");
const gridStructure = require("../mockData/grid/gridStructure.json");
router.get("/getMenuData", (_req, res) => {
  res.json(menuData);
});
router.get("/getGridData", (_req, res) => {
  res.json(gridData);
});
router.get("/getGridStructure", (_req, res) => {
  res.json(gridStructure);
});
module.exports = router;