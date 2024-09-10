const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Group = sequelize.define("rtc_groups", {
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
  __kp_Group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Quality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Staff: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Station: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_User_g: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Area_Big: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Area_Biggest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Area_Medium: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Coordinates: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ID_GROUP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Status_Program: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Year_Started_Program: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sync_farmers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sync_households: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  last_update_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  active: {
    type: DataTypes.ENUM("0","1"),
    defaultValue: "0",
  },
});
module.exports = Group;
