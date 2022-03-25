const { DataTypes, Sequelize } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "user_product",
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
        field: "product_id",
      },
      userId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "user_id",
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
      tableName: "user_product",
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
