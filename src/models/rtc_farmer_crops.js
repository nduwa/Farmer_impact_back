const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Crops = sequelize.define('farmer_crops',{
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
    cropName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    deleted:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
});
module.exports = Crops;