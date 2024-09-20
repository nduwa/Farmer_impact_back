const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Pests_observation_Survey = sequelize.define(
  "rtc_observation_diseases_survey",
  {
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
    __kp_pests_observation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    _kf_trees_survey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);
module.exports = Pests_observation_Survey;
