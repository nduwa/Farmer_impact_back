const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Buffer = sequelize.define('buffer_delivery_report_details',{
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
    deliveryid:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lotid:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('Yes', 'No'),
        allowNull: false
    }
});

module.exports = Buffer;