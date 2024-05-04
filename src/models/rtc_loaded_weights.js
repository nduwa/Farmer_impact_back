const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const loaded_weights = sequelize.define('loaded_weights',{
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
    rtc_delivery_reports_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    rtc_transaction_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    weight_loaded:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    weight_left:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    total_weight_left:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    contribution_sent_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
});
module.exports = loaded_weights;