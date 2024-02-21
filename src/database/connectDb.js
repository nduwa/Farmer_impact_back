
const Sequelize = require('sequelize');
const { DataType } = Sequelize; 
import dotenv from 'dotenv'
dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DATABASE,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host: 'localhost',
    dialect: 'mysql',
    define:{
        freezeTableName:true,
        timestamps: false
    }
});

module.exports = sequelize;