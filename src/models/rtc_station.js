const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Station = sequelize.define('rtc_station',{
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
    __kp_Station:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Area_Big:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Area_Biggest:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Area_Medium:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Area_Small:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Area_Smallest:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Certification:{
        type: DataTypes.STRING,
        allowNull: false
    },
    StationID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Prefix:{
        type: DataTypes.STRING,
        allowNull: false
    },
    RTC_Owned:{
        type: DataTypes.STRING,
        allowNull: false
    },
    synced_price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sync_roles:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    updated:{
        type: DataTypes.INTEGER,
        allowNull: false
    } 
});

module.exports = Station;