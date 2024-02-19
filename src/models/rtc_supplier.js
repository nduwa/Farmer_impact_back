const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Supplier = sequelize.define('rtc_supplier',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    _kf_Quality:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    __kp_Supplier:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Location:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_User_g:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Area_Big:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Area_Biggest:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Area_Medium:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Area_Small:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Area_Smallest:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Certification:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Status:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Ratio_CP:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Relationship:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Report:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Supplier_ID_t:{
        type: DataTypes.STRING,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
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
    _kf_User:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Season:{
        type: DataTypes.STRING,
        allowNull:false
    },
    deleted:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Supplier;