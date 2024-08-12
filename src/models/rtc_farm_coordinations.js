const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Farm_coordinations = sequelize.define("rtc_farm_coordinations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  _kf_Supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Staff: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_User: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Station: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CW_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  national_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmer_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farm_GPS: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});
module.exports = Farm_coordinations;
