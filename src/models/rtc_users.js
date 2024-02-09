const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';
const Users = sequelize.define('rtc_users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    __kp_User:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Location:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Name_Full:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Name_User:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Role:{
        type: DataTypes.STRING,
        allowNull:false
    },
    z_recCreateAccountName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    z_recCreateTimestamp:{
        type: DataTypes.DATE,
        allowNull:false
    },
    z_recModifyAccountName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    z_recModifyTimestamp:{
        type: DataTypes.DATE,
        allowNull:false
    },
    Phone:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Phone_Airtime:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    devicename:{
        type: DataTypes.STRING,
        allowNull:false
    },
    last_update_at:{
        type: DataTypes.DATE,
        allowNull:false
    }
});
module.exports = Users;