const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const translation = sequelize.define('rtc_translations',{
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
    code:{
        type: DataTypes.STRING,
        allowNull:false
    },
    phrase:{
        type: DataTypes.STRING,
        allowNull:false
    },
    phrasefr:{
        type: DataTypes.STRING,
        allowNull:false
    },
    phraserw:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = translation;