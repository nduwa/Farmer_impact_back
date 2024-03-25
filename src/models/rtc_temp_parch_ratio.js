const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const parchRatio = sequelize.define('temp_parchment_ratio',{
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
    cherry_lot_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    parchment_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    parch_grade:{
        type: DataTypes.STRING,
        allowNull:false
    },
    parch_ratio:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    state:{
        type: DataTypes.ENUM('created','Adjusted'),
        allowNull:false,
        defaultValue: 'created'
    },
    adjusted_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:true
    }
    
});
module.exports = parchRatio;