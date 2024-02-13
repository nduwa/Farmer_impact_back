const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Delivery_reports = sequelize.define('rtc_delivery_reports',{
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
    deliveryid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    tally_sheet_no:{
        type: DataTypes.STRING,
        allowNull:false
    },
    truck_plate:{
        type: DataTypes.STRING,
        allowNull:false
    },
    loading_date:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    expected_delivery_date:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    grade:{
        type: DataTypes.STRING,
        allowNull:false
    },
    weight:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    bags:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM('in-transit', 'delivered', 'in-drying', 'in-dry-storage'),
        allowNull:false
    },
    close:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    closed_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    closed_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    loaded_by:{
        type: DataTypes.STRING,
        allowNull:false
    },
    inspected_by:{
        type: DataTypes.STRING,
        allowNull:false
    },
    accountant_by:{
        type: DataTypes.STRING,
        allowNull:false
    },
    driver_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    driver_licence_or_national_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    receiving_form_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    bag_type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    total_bags_received:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    weight_received_bags:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    weight_parch_received:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    gross_weight_parch_received:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    moisture:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    received:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    received_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    received_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
});
module.exports = Delivery_reports;