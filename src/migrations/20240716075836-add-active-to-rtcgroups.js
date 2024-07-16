"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("rtc_groups", "active", {
      type: Sequelize.STRING,
      defaultValue: "0",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("rtc_groups", "active");
  },
};
