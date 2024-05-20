const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Training_attendance = sequelize.define("rtc_training_attendance", {
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
  training_course_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  __kf_farmer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  __kf_group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  __kf_attendance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  _kf_training: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lo: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  la: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});
module.exports = Training_attendance;