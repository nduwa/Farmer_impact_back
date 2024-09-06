"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rtc_tmp_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_Supplier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      __kp_User: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Name_Full: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Name_User: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_station: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      station_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rtc_tmp_users");
  },
};
