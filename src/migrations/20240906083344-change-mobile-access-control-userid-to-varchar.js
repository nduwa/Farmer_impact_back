"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "rtc_mobile_app_access_control",
      "userid",
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "rtc_mobile_app_access_control",
      "userid",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );
  },
};
