const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const HouseholdTrees = sequelize.define("rtc_household_trees", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Staff: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  _kf_User: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  _kf_Station: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  _kf_Supplier: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CW_Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Group_ID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  farmer_ID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  farmer_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  national_ID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  received_seedling: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  survived_seedling: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  planted_year: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  old_trees: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  old_trees_planted_year: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coffee_plot: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nitrogen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  natural_shade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shade_trees: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});

module.exports = HouseholdTrees;
