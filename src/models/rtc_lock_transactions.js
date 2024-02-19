const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Lock_Transaction = sequelize.define('lock_transactions',{
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
    lock_id:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Lock_Transaction;