const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Evaluations = sequelize.define('rtc_evaluations',{
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
    _kf_Course:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Answer:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Question:{
        type: DataTypes.STRING,
        allowNull:false
    },
    priority:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    previewed_answer:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    Question_fr:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Question_rw:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = Evaluations;