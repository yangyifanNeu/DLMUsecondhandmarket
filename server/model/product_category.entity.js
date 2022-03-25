const { DataTypes, Sequelize } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "product_category",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      createTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "product_category",
      timestamps: true,
      createdAt: "createTime",
      updatedAt: "updateTime",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
