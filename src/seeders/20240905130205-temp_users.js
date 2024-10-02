"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rtc_tmp_users", [
      {
        __kp_User: "54A89B71-ECF0-4C36-FC48-5E28BA2D2563",
        user_id: "CS001",
        Name_Full: "Gakwandi John",
        Name_User: "gjohn",
        _kf_supplier: "EDF7A44A-C955-E54D-9B94-48BD28A766A9",
        _kf_station: "EEBFBBC7-A9F6-4349-A5B6-9F0FECA22E01",
        station_name: "Shiwinga",
        email: "doe@gmail.com",
        phone: "0781230123",
        password:
          "$2a$08$kWQqKwXmUyfi.z2AyVh6guqhsVy1z/qlo9xergNShcdtbnD5HfFUi", // 123
        role: "surveyor",
        created_at: new Date(),
        status: 1,
      },
      {
        __kp_User: "62D89C73-ECBD-4D36-1C48-FE28DA2F2562",
        user_id: "CS002",
        Name_Full: "Kandayoge Mariya",
        Name_User: "kmaria",
        _kf_supplier: "333C25C9-A8F4-487F-A92E-1513CB194E18",
        _kf_station: "CD21DEFD-F66F-CD48-BDC1-972B2A31ADD6",
        station_name: "Mayaga",
        email: "doe@gmail.com",
        phone: "0781230123",
        password:
          "$2a$08$kWQqKwXmUyfi.z2AyVh6guqhsVy1z/qlo9xergNShcdtbnD5HfFUi", // 123
        role: "surveyor",
        created_at: new Date(),
        status: 1,
      },
      {
        __kp_User: "52F69D73-DFEB-2F28-1C48-DB38FB2C2563",
        user_id: "CS003",
        Name_Full: "Muvunyi Emmanuel",
        Name_User: "memmanuel",
        _kf_supplier: "07463891-1754-4912-B22B-FA01835012D8",
        _kf_station: "F9642FF7-694C-4B99-A5B4-0FA1028C4AEC",
        station_name: "Muhura",
        email: "doe@gmail.com",
        phone: "0781230123",
        password:
          "$2a$08$kWQqKwXmUyfi.z2AyVh6guqhsVy1z/qlo9xergNShcdtbnD5HfFUi", // 123
        role: "surveyor",
        created_at: new Date(),
        status: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rtc_tmp_users", null, {});
  },
};