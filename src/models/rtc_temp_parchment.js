const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const parchGrade = sequelize.define('temp_parchment_grade',{
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
    parchment_lot_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    parch_grade:{
        type: DataTypes.STRING,
        allowNull:false
    },
    certificate:{
        type: DataTypes.STRING,
        allowNull:false
    },
    parch_weight:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    state:{
        type: DataTypes.ENUM('created','transited'),
        allowNull:false,
        defaultValue: 'created'
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:true
    }
    
});
module.exports = parchGrade;