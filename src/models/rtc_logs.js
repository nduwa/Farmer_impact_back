const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Logs = sequelize.define('rtc_logs',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    __kp_Log:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Location:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Season:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Category:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Reading:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Staff :{
        type: DataTypes.STRING,
        allowNull:false
    },
    Price_n :{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Weight_Period_Reading_n:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Price_Period_Floaters:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Weight_Period_Floaters:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Log_Date:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    z_recCreateTimestamp:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    z_recModifyTimestamp:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    Weight_Season_Cherry_n:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Weight_Reading_n:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }    
});
module.exports = Logs;