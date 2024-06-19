const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Delivery_Reports_Lots = sequelize.define('rtc_delivery_reports_lots',{
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
    rtc_transactionid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    weight:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    bags_loaded:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    bags_of_parchment_left:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    delivery_reportid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    final_bags_of_parchment_left:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    final_weight_left:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    parch_lot_ID :{
        type: DataTypes.STRING,
        allowNull:false
    },
    grade:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Delivery_Reports_Lots;