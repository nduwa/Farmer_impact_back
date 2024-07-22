import dotenv from 'dotenv'
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DB_HOST,
    url:"mysql://root:@localhost:3306/farmerim_rtc",
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: false
  },
  // test: {
  //   username: process.env.TEST_DB_USERNAME,
  //   password: process.env.TEST_DB_PASSWORD,
  //   database: process.env.TEST_DATABASE,
  //   host: process.env.TEST_DB_HOST,
  //   dialect: "mysql" 
  // },
  // production: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.PRODUCTION_DATABASE,
  //   host: process.env.DB_HOST,
  //   dialect: "mysql" 
  // }
};
