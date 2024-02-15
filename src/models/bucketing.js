const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Bucket = sequelize.define('bucketing',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    created_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Season:{
        type: DataTypes.STRING,
        allowNull:false
    }, 
    day_lot_number:{
        type: DataTypes.STRING,
        allowNull:false
    }, 
    bucketA:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    bucketB:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    bucketC:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    certification:{
        type: DataTypes.STRING,
        allowNull:false
    }
});
module.exports = Bucket;