const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const parchids = sequelize.define('temp_cherry_to_parchids',{
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
    sessionid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    grade:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = parchids;