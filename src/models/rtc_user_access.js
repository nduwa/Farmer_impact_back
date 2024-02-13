const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const User_Module = sequelize.define('rtc_users_modules_access',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_ID:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    registers:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    recent_register:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    station_farmer:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    scynced_farmer:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    inspection:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    farmer_inspection:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    wet_mill_audit:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    training:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    session:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    participants:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    courses:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    coffee_purchase:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    untraceable:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    sc_daily_journal:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    cws_daily_journal:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    general_harvest:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    site_harvest:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    coffee_inventory:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    assign_parchment:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    parchment_stock:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    parchment_processing:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    parchment_transport:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    parchment_reception:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    cws_finance:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    new_report:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    view_report:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    cash_requisition:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    new_cash_requisition:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    view_cash_requisition:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    pending_requisition:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    approved_requisition:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    app_setting:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    translation:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    inspection_question:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    manage_user:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    list_user:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    } 
});
module.exports = User_Module;