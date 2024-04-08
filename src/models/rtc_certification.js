const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Certificate = sequelize.define('temp_certification',{
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
    __kp_Certificate:{
        type: DataTypes.STRING,
        allowNull:false
    },
    certificate:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    }
    
});
module.exports = Certificate;