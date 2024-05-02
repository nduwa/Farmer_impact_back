const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Household = sequelize.define("rtc_households", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  __kp_Household: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Location: {
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
  Area_Small: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Area_Smallest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  householdid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  z_Farmer_Primary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("new", "offline"),
    allowNull: false,
  },
  farmerid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  STP_Weight: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  number_of_plots_with_coffee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Trees_Producing: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Trees: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Longitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Children: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Childen_gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Childen_below_18: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recordid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inspectionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cafeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  InspectionStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Household;
