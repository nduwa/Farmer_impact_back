const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const CWS_Finance = sequelize.define('rtc_cws_finances',{
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
    uuid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    other_expenses:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    fuel_or_electricity_expenses:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    money_spent_on_casual_workers:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    transport_costs:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    site_collector_commission:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    farmer_price:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    parchment_delivered:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    parchment_in_store:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    kgs_of_cherry:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    total_number_of_buckets:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    money_spend_on_wages_and_salaries:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    opening_balance:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    closing_balance:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    money_spent_on_cherry:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    reported_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    opening_date:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    closing_date:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull:false
    },
    total_withdraws:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    __Kp_Finance:{
        type: DataTypes.STRING,
        allowNull:false
    },
    fm_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = CWS_Finance;