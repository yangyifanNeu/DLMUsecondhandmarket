
const { DataTypes, Sequelize } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "registrycode",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "注册邮箱",
      },
      code: {
        type: DataTypes.STRING(6),
        allowNull: false,
        comment: "验证码",
      },
      createTime: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "创建时间",
      },
    },
    {
      sequelize,
      tableName: "registrycode",
      timestamps: true,
      createdAt:"createTime",
      updatedAt:false,
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
