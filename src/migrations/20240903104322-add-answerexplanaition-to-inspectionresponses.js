"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "inspection_responses",
      "answer_explanaition",
      {
        type: Sequelize.STRING,
        defaultValue: "",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "inspection_responses",
      "answer_explanaition"
    );
  },
};
