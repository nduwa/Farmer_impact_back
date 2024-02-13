const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Inspection_Answer = sequelize.define('inspection_answers',{
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
    Eng_answer:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Kiny_answer:{
        type: DataTypes.STRING,
        allowNull:false
    },
    question_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    priority:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    created_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    score:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    __kp_Option:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Evaluation:{
        type: DataTypes.STRING,
        allowNull:false
    }
});
module.exports = Inspection_Answer;