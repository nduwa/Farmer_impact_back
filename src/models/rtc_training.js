const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Training = sequelize.define('rtc_training',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    __kp_Course :{
        type: DataTypes.STRING,
        allowNull:false
    },
    Duration:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    ID_COURSE:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Name_rw:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Name_fr:{
        type: DataTypes.STRING,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = Training;