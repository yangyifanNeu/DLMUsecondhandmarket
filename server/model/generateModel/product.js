const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    originalprice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    currentprice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    condition: {
      type: DataTypes.ENUM('0','1','2','3'),
      allowNull: false,
      defaultValue: "1"
    },
    buyingway: {
      type: DataTypes.ENUM('1','2','3'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
