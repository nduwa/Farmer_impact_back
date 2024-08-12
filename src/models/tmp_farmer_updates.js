const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const farmerUpdates = sequelize.define("tmp_farmer_updates", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  __kp_Farmer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Staff: {
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
  Year_Birth: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CW_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmer_ID: {
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
  Phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Marital_Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Reading_Skills: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Math_Skills: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  education_level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cell: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  village: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Trees: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Trees_Producing: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  number_of_plots_with_coffee: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("update", "delete", "approved"),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = farmerUpdates;
