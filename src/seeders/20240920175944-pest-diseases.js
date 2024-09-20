"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rtc_pests_diseases_survey", [
      {
        created_at: new Date(),
        __kp_pests_diseases: "D82CA864-1A3E-1782-1006-71C4A4D35D56",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Leaf rust",
        level: "More than half of the farm",
      },
      {
        created_at: new Date(),
        __kp_pests_diseases: "D82CA864-1A3E-1782-1006-71C4A4D35D56",
        _kf_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        name: "Antestia",
        level: "1/3 of the farm",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rtc_pests_diseases_survey", null, {});
  },
};
