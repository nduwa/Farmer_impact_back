const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Drying = sequelize.define('drying',{
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
    certification:{
        type: DataTypes.STRING,
        allowNull: false
    },
    day_lot_number:{
        type: DataTypes.STRING,
        allowNull: false
    },
    GradeA:{
        type: DataTypes.STRING,
        allowNull: false
    },
    GradeB:{
        type: DataTypes.STRING,
        allowNull: false
    },
    GradeC:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    outturn:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    moistureA:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    moistureB:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    moistureC:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    gradeATaken:{
        type: DataTypes.ENUM('before', 'after'),
        allowNull: false
    },
    gradeBTaken:{
        type: DataTypes.ENUM('before', 'after'),
        allowNull: false
    },
    gradeCTaken:{
        type: DataTypes.ENUM('before', 'after'),
        allowNull: false
    },
    FinalGradeA:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    FinalGradeB:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    FinalGradeC:{
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});

module.exports = Drying;
