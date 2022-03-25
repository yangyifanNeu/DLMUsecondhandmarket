const { DataTypes, Sequelize } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "tag",
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
      tableName: "tag",
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
