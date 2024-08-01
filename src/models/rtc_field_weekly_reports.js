const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Field_reports = sequelize.define("rtc_field_weekly_report", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  _kf_Staff: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_User: {
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
  CW_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trained_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  men_attended: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  women_attended: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  planned_groups: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farm_inspected: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  planned_inspected: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});
module.exports = Field_reports;
