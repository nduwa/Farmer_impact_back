const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Courses_observation_Survey = sequelize.define(
  "rtc_observation_courses_survey",
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
    __kp_courses_observation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    _kf_trees_survey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);
module.exports = Courses_observation_Survey;
