const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Temp_contributions = sequelize.define('temp_contributions',{
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
        allowNull: false,
    

    },
    farmer_name:{
        type: DataTypes.STRING,
        allowNull: false,


    },
    farmer_id:{
        type: DataTypes.STRING,
        allowNull: false,
    

    },
    floaters:{
        type:DataTypes.INTEGER,
        allowNull: false,
      


    },
    parch_weight:{
        type: DataTypes.DOUBLE,
        allowNull:false,
      

    },
    parch_ratio:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    station:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:""

    },
    amount_paid:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit_price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contribution_sent_at:{
        type: DataTypes.STRING,
        allowNull: false
    },
    contribution_created_at:{
        type: DataTypes.STRING,
        allowNull: false
    },
    contribution_created_by:{
        type: DataTypes.STRING,
        allowNull: false

    },
    contribution_id:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rtc_delivery_reports_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rtc_transaction_id:{
        type: DataTypes.STRING,
        allowNull: false
    },
   transaction_weight:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    weight_loaded:{
        type: DataTypes.DOUBLE,
        allowNull:false

    },
    started_at:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ended_at:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"0000-00-00 00:00:00"
    },
    lastupdated_at:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"0000-00-00 00:00:00"

    }
});

module.exports = Temp_contributions;
