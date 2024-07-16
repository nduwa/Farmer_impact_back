"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rtc_farmer_group_assignment", [
      {
        created_at: new Date(),
        _kf_farmer: "A00C65DE-D8C9-450D-803C-B3889F2918F3",
        _kf_station: "F9642FF7-694C-4B99-A5B4-0FA1028C4AEC",
        _kf_Supplier: "07463891-1754-4912-B22B-FA01835012D8",
        kf_group_old: "060ABF56-593B-432C-89D4-53FC039A807E",
        kf_group_new: "8B55CDE5-E793-485F-8536-D37B7B31428B",
        assigned_by: "etumwesigye",
        status: "new",
        uploaded_at: new Date(),
      },
      {
        created_at: new Date(),
        _kf_farmer: "F4C396BA-6969-49A8-8835-E8C949A00B1D",
        _kf_station: "F9642FF7-694C-4B99-A5B4-0FA1028C4AEC",
        _kf_Supplier: "07463891-1754-4912-B22B-FA01835012D8",
        kf_group_old: "060ABF56-593B-432C-89D4-53FC039A807E",
        kf_group_new: "07989B88-C8E5-4CEA-8811-B8BDD2907481",
        assigned_by: "etumwesigye",
        status: "new",
        uploaded_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rtc_farmer_group_assignment", null, {});
  },
};
