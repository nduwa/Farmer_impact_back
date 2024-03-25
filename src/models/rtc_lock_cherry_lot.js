const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Lock_cherry_lot = sequelize.define('lock_fm_cherry_lot_its',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    cherry_lot_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
    
});
module.exports = Lock_cherry_lot;