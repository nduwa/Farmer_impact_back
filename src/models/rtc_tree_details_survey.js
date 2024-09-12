const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Tree_details_Survey = sequelize.define("rtc_tree_details_survey", {
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
  __kp_tree_details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_trees_survey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  est_production_kg: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  est_production_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  received_seedlings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  received_seedlings_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rejuvenated_seedlings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rejuvenated_seedlings_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
module.exports = Tree_details_Survey;
