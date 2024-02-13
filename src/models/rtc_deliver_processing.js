const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Proccessing = sequelize.define('deliveries_processing',{
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
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    started_at:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ended_at:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastupdated_at:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Proccessing;
