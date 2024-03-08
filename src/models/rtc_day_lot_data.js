const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Day_lot = sequelize.define('day_lots_data',{
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
        allowNull: false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull: false
    },
    day_lot_number:{
        type: DataTypes.STRING,
        allowNull: false
    },
    UserID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    site_day_lot:{
        type: DataTypes.STRING,
        allowNull: false
    },
    site_cherry_kgs:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    site_cherry_price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    site_Floater_kgs:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    site_Floater_price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commission_fees:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transport_fees:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    floater_transport_fee:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    site_total_payment:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('0', '1'),
        allowNull: false,
        defaultValue:0
    }
});

module.exports =  Day_lot ;