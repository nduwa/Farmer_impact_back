"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rtc_trees_survey", {
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
      __kp_trees_survey: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_User: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_Station: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_Supplier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_tree_details: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_pests_diseases: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_pests_observation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_courses_observation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      station_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      group_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      farmer_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      farmer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      national_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year_of_birth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      child_1_to_20_yrs: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      child_20_to_30_yrs: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      income_source_main: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coffee_trees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      coffee_farms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trees_10_20: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trees_20_more: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trees_less_than_10: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      shade_trees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      natural_shade_trees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nitrogen_fixing_shade_trees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      other_crops_in_coffee_farm: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      other_crops_in_farm: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("new", "verified", "Approved", "deleted"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rtc_trees_survey");
  },
};
