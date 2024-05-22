const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const User_Access = sequelize.define("temp_user_access", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  __kp_access: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_User: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Staff: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  staff_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("0", "1"),
    allowNull: false,
    defaultValue: "0",
  },
  state: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
    defaultValue: "Inactive",
  },
});
module.exports = User_Access;
