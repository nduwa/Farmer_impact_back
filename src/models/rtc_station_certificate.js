const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const StationCertificate = sequelize.define('temp_station_certicate',{
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
    __kp_State_Cert:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Certificate:{
        type: DataTypes.STRING,
        allowNull:false
    },
    state:{
        type: DataTypes.ENUM('Active','Inactive'),
        allowNull:false,
        defaultValue: 'Active'
    },
    
});
module.exports = StationCertificate;