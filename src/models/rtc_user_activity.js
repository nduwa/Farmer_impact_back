const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const User_activity = sequelize.define('user_activity',{
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
        type: DataTypes.INTEGER,
        allowNull:false
    },
    activity:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    device_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = User_activity;