"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rtc_observation_courses_survey", [
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        course_name: "Mulching",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        course_name: "Compost heap",
        rating: "Worst",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        course_name: "Pruning",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        course_name: "Trenches",
        rating: "Average",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        course_name: "Rejuvenation (Old trees)",
        rating: "Average",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        course_name: "Weed Control",
        rating: "Worst",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        course_name: "Traps",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        course_name: "Contour grass",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        course_name: "Inorganic waste",
        rating: "Average",
      },

      {
        created_at: new Date(),
        __kp_courses_observation: "14A84DD9-B075-8E44-554C-3895B36DB661",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        course_name: "Mulching",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "14A84DD9-B075-8E44-554C-3895B36DB661",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        course_name: "Compost heap",
        rating: "Worst",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "14A84DD9-B075-8E44-554C-3895B36DB661",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        course_name: "Pruning",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "14A84DD9-B075-8E44-554C-3895B36DB661",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        course_name: "Trenches",
        rating: "Average",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "14A84DD9-B075-8E44-554C-3895B36DB661",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        course_name: "Rejuvenation (Old trees)",
        rating: "Average",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "14A84DD9-B075-8E44-554C-3895B36DB661",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        course_name: "Weed Control",
        rating: "Worst",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "14A84DD9-B075-8E44-554C-3895B36DB661",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        course_name: "Traps",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "14A84DD9-B075-8E44-554C-3895B36DB661",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        course_name: "Contour grass",
        rating: "Best",
      },
      {
        created_at: new Date(),
        __kp_courses_observation: "14A84DD9-B075-8E44-554C-3895B36DB661",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        course_name: "Inorganic waste",
        rating: "Average",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rtc_observation_courses_survey", null, {});
  },
};
