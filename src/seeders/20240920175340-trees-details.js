"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rtc_tree_details_survey", [
      {
        created_at: new Date(),
        __kp_tree_details: "E14F433E-FAD1-B720-0E7B-03A757721862",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        est_production_kg: 0,
        est_production_year: 2021,
        received_seedlings: 234,
        received_seedlings_year: 2021,
        rejuvenated_seedlings: 0,
        rejuvenated_seedlings_year: 2021,
      },
      {
        created_at: new Date(),
        __kp_tree_details: "E14F433E-FAD1-B720-0E7B-03A757721862",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        est_production_kg: 0,
        est_production_year: 2022,
        received_seedlings: 300,
        received_seedlings_year: 2022,
        rejuvenated_seedlings: 0,
        rejuvenated_seedlings_year: 2022,
      },
      {
        created_at: new Date(),
        __kp_tree_details: "E14F433E-FAD1-B720-0E7B-03A757721862",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        est_production_kg: 2300,
        est_production_year: 2023,
        received_seedlings: 500,
        received_seedlings_year: 2023,
        rejuvenated_seedlings: 123,
        rejuvenated_seedlings_year: 2023,
      },
      {
        created_at: new Date(),
        __kp_tree_details: "E14F433E-FAD1-B720-0E7B-03A757721862",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        est_production_kg: 4500,
        est_production_year: 2024,
        received_seedlings: 0,
        received_seedlings_year: 2024,
        rejuvenated_seedlings: 123,
        rejuvenated_seedlings_year: 2024,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rtc_tree_details_survey", null, {});
  },
};
