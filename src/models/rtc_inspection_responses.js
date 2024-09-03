const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Inspection_Response = sequelize.define("inspection_responses", {
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
  rtc_inspections_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inspection_answer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answer_explanaition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  __kp_InspectionLog: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Inspection_Response;
