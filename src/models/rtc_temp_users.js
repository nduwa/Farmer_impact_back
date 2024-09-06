const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Temporary_users = sequelize.define("rtc_tmp_users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  __kp_User: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Name_Full: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Name_User: {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
module.exports = Temporary_users;
