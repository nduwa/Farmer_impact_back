"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rtc_observation_courses_survey", [
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Mulching",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Compost heap",
        rating: "Worst",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Pruning",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Trenches",
        rating: "Average",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Rejuvenation (Old trees)",
        rating: "Average",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Weed Control",
        rating: "Worst",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Traps",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Contour grass",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Inorganic waste",
        rating: "Average",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rtc_observation_courses_survey", null, {});
  },
};