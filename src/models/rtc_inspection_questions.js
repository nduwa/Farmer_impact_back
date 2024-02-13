const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Inspection_question = sequelize.define('inspection_questions',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    __kp_Evaluation :{
        type: DataTypes.STRING,
        allowNull:false
    },
    evaluation_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    evaluation_mode:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Eng_phrase:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    Kiny_phrase:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    award:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    priority:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    _kf_Course:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Answer:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = Inspection_question;