const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Field_farmer = sequelize.define("rtc_field_farmers", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  _kf_Supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Staff: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_User: {
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
  CW_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Year_Birth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  National_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Marital_Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Group_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  village: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "new",
  },
  cell: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:"new"
},
  Trees: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Trees_Producing: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number_of_plots: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Skills: {
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farm_GPS: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Field_farmer;
sequelize.sync();
