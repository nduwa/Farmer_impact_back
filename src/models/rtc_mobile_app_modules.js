const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Mobile_App_Modules = sequelize.define("rtc_mobile_app_modules", {
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
  module_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Mobile_App_Modules;
