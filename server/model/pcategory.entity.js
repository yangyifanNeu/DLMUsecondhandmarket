const { DataTypes, Sequelize } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "pcategory",
    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
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
      icon: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "pcategory",
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
