const { DataTypes, Sequelize } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
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
        allowNull: false,
      },
      updateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      condition: {
        type: DataTypes.ENUM("0", "1", "2", "3"),
        allowNull: false,
      },
      buyingway: {
        type: DataTypes.ENUM("1", "2", "3"),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "product",
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
