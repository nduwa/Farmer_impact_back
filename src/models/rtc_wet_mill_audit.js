const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const User_activity = sequelize.define('user_activity',{
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
    created_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    variable_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    variable_type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    variable_data:{
        type: DataTypes.STRING,
        allowNull:false
    },
    tab_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    current_lat:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    current_long:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    uuid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    __kp_Station:{
        type: DataTypes.STRING,
        allowNull:false
    },
    emailed:{
        type: DataTypes.STRING,
        allowNull:false
    },
    audited_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    emailed_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
    
});
module.exports = User_activity;