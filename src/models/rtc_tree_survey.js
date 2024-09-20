const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Trees_Survey = sequelize.define("rtc_trees_survey", {
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
  __kp_trees_survey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_User: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  full_name: {
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
  _kf_tree_details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_pests_diseases: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_pests_observation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_courses_observation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  station_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmer_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  national_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year_of_birth: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  child_1_to_20_yrs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  child_20_to_30_yrs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  income_source_main: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coffee_trees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  coffee_farms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trees_10_20: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trees_20_more: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trees_less_than_10: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shade_trees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  natural_shade_trees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nitrogen_fixing_shade_trees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  other_crops_in_coffee_farm: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  other_crops_in_farm: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("new", "verified", "Approved", "deleted"),
    allowNull: false,
    defaultValue: "new",
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: true,
  },
});
module.exports = Trees_Survey;
