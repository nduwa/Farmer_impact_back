const { DataTypes } = require("sequelize");
import sequelize from "../database/connectDb";

const Temp_cherrylots = sequelize.define("temp_cherrylots", {
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
  certification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _Kf_Category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Reading: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Season: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Station: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _kf_Location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  _kf_Type: {
    type: DataTypes.STRING,

    allowNull: false,
  },
  _kf_Staff: {
    type: DataTypes.STRING,

    allowNull: false,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Price_n: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Weight_Period_Reading_n: {
    type: DataTypes.INTEGER,

    allowNull: false,
  },
  Weight_Period_Floaters: {
    type: DataTypes.INTEGER,

    allowNull: false,
  },
  Price_Period_Floaters: {
    type: DataTypes.INTEGER,

    allowNull: false,
  },
});

module.exports = Temp_cherrylots;
