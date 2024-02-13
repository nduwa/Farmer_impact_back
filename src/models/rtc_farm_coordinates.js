const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Farm_coordinates = sequelize.define('rtc_farm_coordinates',{
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
    farmerid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    latitude:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    longitude:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    uploaded_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    cropNameId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    farm_unit_area:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    soil_slope:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    uuid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false
    }
});
module.exports = Farm_coordinates;