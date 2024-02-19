const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Transaction = sequelize.define('rtc_transactions',{
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
    farmerid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    farmername:{
        type: DataTypes.STRING,
        allowNull:false
    },
    coffee_type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    transaction_type:{
        type: DataTypes.STRING,
        allowNull:true
    },
    kilograms:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    unitprice:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    lotnumber:{
        type: DataTypes.STRING,
        allowNull:false
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    transaction_date:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    approved:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    approved_at:{
        type: DataTypes.DATE,
        allowNull:true
    },
    approved_by:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    __kp_Log:{
        type: DataTypes.STRING,
        allowNull:true
    },
    recordid:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    certification:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Staff:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull:false
    },
    uploaded:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    uploaded_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    average_dollar_price:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    green_kgs:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    weigh_note_kgs:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    day_lotid:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    site_day_lot:{
        type: DataTypes.STRING,
        allowNull:false
    },
    DayLotNumber:{
        type: DataTypes.STRING,
        allowNull:false
    },
    paper_receipt:{
        type: DataTypes.STRING,
        allowNull:false
    },
    paper_receipt_image_uploaded:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    balance_owed:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    certified:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    edited:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    c_grade_merged:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    loaded:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    state:{
        type: DataTypes.ENUM('created','in-transit','delivered','in-drying','in-dry-storage'),
        allowNull:false,
        defaultValue: 'created'
    },
    fm_approval:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    cash_paid:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    closed_by:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    closed_at:{
        type: DataTypes.DATE,
        allowNull:true
    },
    cherry_lot_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    cherry_lot_id_kf_log:{
        type: DataTypes.STRING,
        allowNull:true
    },
    cherry_lot_id_recordID:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    parchment_lot_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    parchment_lot_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    gradeA:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    gradeB:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    gradeC:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    traceable:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    total_mobile_money_payment:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    bad_unit_price:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    bad_kilograms:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    bad_cherry_lot_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    bad_parch_lot_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Season:{
        type: DataTypes.STRING,
        allowNull:false
    },
    parch_ratioA:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    parch_ratioB:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    parch_ratioC:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    bad_gradeC:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    bad_parch_ratioC:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    adjusted_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    parchID_A:{
        type: DataTypes.STRING,
        allowNull:true
    },
    parchID_B:{
        type: DataTypes.STRING,
        allowNull:true
    },
    parchID_C:{
        type: DataTypes.STRING,
        allowNull:true
    },
    parchID_A_Weight:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    parchID_B_Weight:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    parchID_C_Weight:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    parchIDA_ratio:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    parchIDB_ratio:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    parchIDC_ratio:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    Parch_Contr_A_status:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    Parch_Contr_B_status:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    Parch_Contr_C_status:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    floaters_sent:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    }
    
});
module.exports = Transaction;