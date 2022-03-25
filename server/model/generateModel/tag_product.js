const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tag_product', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    tagId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    productId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tag_product',
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
