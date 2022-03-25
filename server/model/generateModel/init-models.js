var DataTypes = require("sequelize").DataTypes;
var _codelist = require("./codelist");
var _pcategory = require("./pcategory");
var _product = require("./product");
var _product_category = require("./product_category");
var _registrycode = require("./registrycode");
var _tag = require("./tag");
var _tag_product = require("./tag_product");
var _user = require("./user");
var _user_product = require("./user_product");

function initModels(sequelize) {
  var codelist = _codelist(sequelize, DataTypes);
  var pcategory = _pcategory(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_category = _product_category(sequelize, DataTypes);
  var registrycode = _registrycode(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var tag_product = _tag_product(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_product = _user_product(sequelize, DataTypes);


  return {
    codelist,
    pcategory,
    product,
    product_category,
    registrycode,
    tag,
    tag_product,
    user,
    user_product,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
