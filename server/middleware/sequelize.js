const { Sequelize } = require('sequelize');
const { MYSQL_CONF } = require("../conf/db");

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize(MYSQL_CONF.database,MYSQL_CONF.username,MYSQL_CONF.password,{
  host:MYSQL_CONF.host,
  dialect:"mysql",
  pool:{
    max:5,
    min:0,
    idle:30000
  },
  port:MYSQL_CONF.port,
  timezone: '+08:00'
})

const modelDefiners = [
	require('../model/user.entity'),
  require('../model/product.entity'),
  require('../model/product_user.entity'),
  require("../model/registrycode.entity"),
  require("../model/pcategory.entity"),
  require("../model/product_category.entity"),
  require("../model/codelist.entity"),
  require("../model/tag.entity"),
  require("../model/tag_product.entity")
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}
let {user,product,user_product,product_category,pcategory,tag,tag_product} = sequelize.models;
user.belongsToMany(product,{
  through:{
    model:user_product,
    unique:false
  },
  foreignKey:"userId",
  constraints:false
});
product.belongsToMany(user,{
  through:{
    model:user_product,
    unique:false
  },
  foreignKey:"productId",
  constraints:false
})
product.belongsToMany(pcategory,{
  through:{
    model:product_category,
    unique:false
  },
  foreignKey:"productId",
  constraints:false
})
pcategory.belongsToMany(product,{
  through:{
    model:product_category,
    unique:false
  },
  foreignKey:"categoryId",
  constraints:false
})
product.belongsToMany(tag,{
  through:{
    model:tag_product,
    unique:false
  },
  foreignKey:"productId",
  constraints:false
})
tag.belongsToMany(product,{
  through:{
    model:tag_product,
    unique:false
  },
  foreignKey:"tagId",
  constraints:false
})
// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
