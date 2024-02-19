const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Children = sequelize.define('rtc_children',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    created_by:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_household:{
        type: DataTypes.STRING,
        allowNull:false
    },
    children:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    uploaded:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    uploaded_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
});
module.exports = Children;