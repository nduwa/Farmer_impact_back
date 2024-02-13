const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const farmers_lock = sequelize.define('rtc_farmers_lock',{
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
    lock:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = farmers_lock;