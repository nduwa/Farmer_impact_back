const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Pests_Survey = sequelize.define("rtc_pests_diseases_survey", {
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
  __kp_pests_diseases: {
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
});
module.exports = Pests_Survey;
