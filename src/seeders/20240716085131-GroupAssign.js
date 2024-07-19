"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rtc_farmer_group_assignment", [
      {
        created_at: new Date(),
        _kf_farmer: "A00C65DE-D8C9-450D-803C-B3889F2918F3",
        farmer_name: "Mukagasana Console",
        farmerid: "F2293A",
        _kf_station: "F9642FF7-694C-4B99-A5B4-0FA1028C4AEC",
        station_name: "Muhura",
        station_id: "WS004",
        _kf_Supplier: "07463891-1754-4912-B22B-FA01835012D8",
        _kf_Household: "BE6A78ED-FE70-41C7-8621-EB7E4BC418BC",
        kf_group_old: "060ABF56-593B-432C-89D4-53FC039A807E",
        group_name_old: "Abadacogora",
        group_id_old: "MM019",
        kf_group_new: "8B55CDE5-E793-485F-8536-D37B7B31428B",
        group_name_new: "Imbere Heza",
        group_id_new: "MM020",
        assigned_by: "etumwesigye",
        status: "new",
        uploaded_at: new Date(),
      },
      {
        created_at: new Date(),
        _kf_farmer: "F4C396BA-6969-49A8-8835-E8C949A00B1D",
        farmer_name: "Sibomana Theoneste",
        farmerid: "F2315A",
        _kf_station: "F9642FF7-694C-4B99-A5B4-0FA1028C4AEC",
        station_name: "Muhura",
        station_id: "WS004",
        _kf_Supplier: "07463891-1754-4912-B22B-FA01835012D8",
        kf_group_old: "060ABF56-593B-432C-89D4-53FC039A807E",
        group_name_old: "Abadacogora",
        group_id_old: "MM019",
        kf_group_new: "07989B88-C8E5-4CEA-8811-B8BDD2907481",
        group_name_new: "Garagaza Ibikorwa",
        group_id_new: "MM021",
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
