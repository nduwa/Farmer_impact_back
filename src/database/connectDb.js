
const Sequelize = require('sequelize');
const { DataType } = Sequelize; 

const sequelize = new Sequelize('farmerim_rtc','root','',{
    host: 'localhost',
    dialect: 'mysql',
    define:{
        freezeTableName:true,
        timestamps: false
    }
});

module.exports = sequelize;