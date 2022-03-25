var express = require("express");
const { getIdParam } = require("./helper/helper");
const { models } = require("../middleware/sequelize");
const sequelize = require("../middleware/sequelize");
const userModel = models.user;
const product = models.product;
const product_category = models.product_category;
const user_product = models.user_product;
const tag_product = models.tag_product;
const pcategory = models.pcategory;
const tag = models.tag;
const { Op, Sequelize, QueryTypes } = require("sequelize");
const url = require("url");
const { encryptString } = require("../tools/encryption");

var router = express.Router();
router.get("/userProducts", (_req, res) => {
  const username = _req.query.username;
  userModel
    .findAll({
      where: {
        [Op.and]: [{ name: username }],
      },
      include: [{ model: product }],
    })
    .then(function (user) {
      res.send(user);
    })
    .catch((ex) => {
      throw new Error(ex);
    });
});
router.get("/getProductsByCurrentUser", async (_req, res) => {
  let userId = _req.session.user;
  productSql = Sequelize.literal(
    `SELECT product_id FROM user_product WHERE user_id = '${userId}' `
  );
  let result = await product.findAll({
    where: {
      id: [productSql],
    },
    include: [{ model: tag }],
  });
  res.send(result);
});
router.post("/updateProduct", async (_req, res) => {
  let productObj = _req.body;
  let tags = productObj.tag;
  delete productObj.tag;
  let result = await product.update(productObj, {
    where: {
      id: productObj.id,
    },
  });
  let result2 = await tag_product.destroy({
    where: {
      productId: productObj.id,
    },
  });
  for (let i = 0; i < tags.length; i++) {
    let r = await tag_product.create({
      tagId: tags[i],
      productId: productObj.id,
    });
  }
  res.send("success");
  // let result = await product.findAll({
  //   where:{
  //     id:[productSql]
  //   },
  //   include:[{ model: tag }]
  // })
  // res.send(result);
});
router.get("/allProducts", async (_req, res) => {
  let products = await product.findAll({ include: [{ model: pcategory }] });
  res.send(products);
});
router.get("/categoryProducts", (_req, res) => {
  const category = _req.query.category;
  pcategory
    .findAll({
      where: {
        [Op.and]: [{ id: category }],
      },
      include: [{ model: product }],
    })
    .then(function (user) {
      res.send(user);
    })
    .catch((ex) => {
      throw new Error(ex);
    });
});

router.post("/getProductsByCondition", async (_req, res) => {
  let condition = _req.body;
  let { category, tags, price, keyWords } = condition;
  let categorySql = [];
  let tagSql = [];
  if (category && category.length > 0) {
    categorySql = await sequelize.query(
      `SELECT DISTINCT productId FROM product_category WHERE categoryId IN ( ${category.join(
        ","
      )} )`,
      { type: QueryTypes.SELECT }
    );
    categorySql = categorySql.map((item) => {
      return item["productId"];
    });
  }
  if (tags && tags.length > 0) {
    let tagsa = tags.map((item) => {
      return "'" + item + "'";
    });
    tagSql = await sequelize.query(
      `SELECT DISTINCT productId FROM tag_product WHERE tagId IN ( ${tagsa.join(
        ","
      )} )`,
      { type: QueryTypes.SELECT }
    );
    tagSql = tagSql.map((item) => {
      return item["productId"];
    });
  }
  let productIds = [].concat(categorySql, tagSql);
  let newProductIds = [];
  for (let index = 0; index < productIds.length; index++) {
    const element = productIds[index];
    if (newProductIds.indexOf(element) == -1) {
      newProductIds.push(element);
    }
  }
  let searchCondition = {};
  let priceObj = {};
  if (
    price &&
    price.length == 2 &&
    (typeof price[0] == "number" || typeof price[1] == "number")
  ) {
    price[0] = price[0] || 0;
    price[1] = price[1] || 1000000;
    priceObj = {
      [Op.gte]: price[0],
      [Op.lte]: price[1],
    };
    searchCondition.currentprice = priceObj;
  }
  if (keyWords) {
    let nameObj = {
      [Op.substring]: keyWords,
    };
    let description = {
      [Op.substring]: keyWords,
    };
    searchCondition[Op.or] = [
      {
        name: nameObj,
      },
      { description: description },
    ];
  }

  if (newProductIds.length > 0) {
    searchCondition.id = newProductIds;
  }
  let result = await product.findAll({
    where: searchCondition,
    include: [{ model: pcategory }]
  });
  res.send(result);
});

router.post("/createProucts", async (_req, res) => {
  let productItem = _req.body;
  let result = await product.create({ ...productItem });
  let categoryResult = await product_category.create({
    productId: result.id,
    categoryId: productItem.category,
  });
  let userId = _req.session.user;
  let userResult = await user_product.create({
    productId: result.id,
    userId: userId,
  });
  result.category = categoryResult.id;
  result.userId = userResult.userId;
  res.send(result);
});
module.exports = router;
