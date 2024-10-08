const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Farmers = sequelize.define('rtc_farmers',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    __kp_Farmer:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Group:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Household:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Location:{
        type: DataTypes.STRING,
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
    Year_Birth:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
    farmerid:{
        type: DataTypes.STRING,
        allowNull: false  
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    National_ID_t:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Position:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CAFE_ID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    SAN_ID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    UTZ_ID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Marital_Status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Reading_Skills:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Math_Skills:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    created_by:{
        type: DataTypes.STRING,
        allowNull: false
    },
    registered_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    type:{
        type: DataTypes.ENUM('new','update','offline','online'),
        allowNull: false
    },
    sync_farmers:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uploaded:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uploaded_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    Area_Small:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Area_Smallest:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Trees:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    Trees_Producing:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    number_of_plots_with_coffee:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    STP_Weight:{
        type: DataTypes.STRING,
        allowNull: false
    },
    education_level:{
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    longitude:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    householdid:{
        type: DataTypes.STRING,
        allowNull: false
    },
    seasonal_goal:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    recordid:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Farmers
sequelize.sync();
