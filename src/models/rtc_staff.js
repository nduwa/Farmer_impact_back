const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Staff = sequelize.define('staff',{
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
    __kp_Staff :{
        type: DataTypes.INTEGER,
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
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_User:{
        type: DataTypes.STRING,
        allowNull:false
    },
    userID:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Phone:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Role:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Gender:{
        type: DataTypes.STRING,
        allowNull:false
    },
    synced_groups:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    last_update_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    freezeTableName: true
},
);
module.exports = Staff;