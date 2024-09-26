"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rtc_observation_diseases_survey", [
      {
        created_at: new Date(),
        __kp_pests_observation: "1F068BB5-DBA6-C24A-13A5-C6F6AB06ED83",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Leaf rust",
        level: "More than half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "1F068BB5-DBA6-C24A-13A5-C6F6AB06ED83",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Antestia",
        level: "Half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "1F068BB5-DBA6-C24A-13A5-C6F6AB06ED83",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Coffee berry borer",
        level: "1/3 of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "1F068BB5-DBA6-C24A-13A5-C6F6AB06ED83",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Coffee berry disease",
        level: "Half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "1F068BB5-DBA6-C24A-13A5-C6F6AB06ED83",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "White Stem borer",
        level: "More than half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "1F068BB5-DBA6-C24A-13A5-C6F6AB06ED83",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Scares and mealy bugs",
        level: "More than half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "1F068BB5-DBA6-C24A-13A5-C6F6AB06ED83",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Traps",
        level: "1/3 of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "1F068BB5-DBA6-C24A-13A5-C6F6AB06ED83",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Leaf miner",
        level: "Half of the farm",
      },

      {
        created_at: new Date(),
        __kp_pests_observation: "0D068BB5-DBA6-C24A-13A5-C6F6AB06ED12",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        name: "Leaf rust",
        level: "More than half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "0D068BB5-DBA6-C24A-13A5-C6F6AB06ED12",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        name: "Antestia",
        level: "Half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "0D068BB5-DBA6-C24A-13A5-C6F6AB06ED12",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        name: "Coffee berry borer",
        level: "1/3 of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "0D068BB5-DBA6-C24A-13A5-C6F6AB06ED12",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        name: "Coffee berry disease",
        level: "Half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "0D068BB5-DBA6-C24A-13A5-C6F6AB06ED12",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        name: "White Stem borer",
        level: "More than half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "0D068BB5-DBA6-C24A-13A5-C6F6AB06ED12",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        name: "Scares and mealy bugs",
        level: "More than half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "0D068BB5-DBA6-C24A-13A5-C6F6AB06ED12",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        name: "Traps",
        level: "1/3 of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_observation: "0D068BB5-DBA6-C24A-13A5-C6F6AB06ED12",
        _kf_trees_survey: "4860FB17-4F28-4342-F815-2CD4E6451932",
        name: "Leaf miner",
        level: "Half of the farm",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "rtc_observation_diseases_survey",
      null,
      {}
    );
  },
};
