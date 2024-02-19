const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Mobile_App_Modules = sequelize.define('rtc_mobile_app_modules',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    module_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    platform:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Mobile_App_Modules;