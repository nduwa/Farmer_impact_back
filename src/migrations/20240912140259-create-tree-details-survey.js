"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rtc_tree_details_survey", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      __kp_tree_details: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_trees_survey: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      est_production_kg: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      est_production_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      received_seedlings: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      received_seedlings_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rejuvenated_seedlings: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rejuvenated_seedlings_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rtc_tree_details_survey");
  },
};
