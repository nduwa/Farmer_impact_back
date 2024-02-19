const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Readings = sequelize.define('rtc_readings',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    __kp_Reading:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Location:{
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
    Ratio_CP:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Updated_d:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Weight_Cherry_n:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Weight_Floaters_n:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    _kf_Season:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    modified_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    Bucket_A:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Bucket_B:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Bucket_C:{
        type: DataTypes.DOUBLE,
        allowNull:false
    }
        
});
module.exports = Readings;