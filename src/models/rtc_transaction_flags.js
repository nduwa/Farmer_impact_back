const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Transaction_flag = sequelize.define('rtc_transaction_flags',{
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
    rtc_transactionid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    flag:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    cleared_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
    
});
module.exports = Transaction_flag;