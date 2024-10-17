const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const GroupAssignment = sequelize.define("rtc_farmer_group_assignment", {
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
  _kf_farmer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmerid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_station: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  station_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  station_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Household: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kf_group_old: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group_name_old: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group_id_old: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kf_group_new: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group_name_new: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group_id_new: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assigned_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("new", "verified", "approved", "deleted"),
    allowNull: false,
  },
  approved_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approved_at: {
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true,
  },
  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});
module.exports = GroupAssignment;
