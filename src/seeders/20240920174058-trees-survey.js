"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rtc_trees_survey", [
      {
        created_at: new Date(),
        __kp_trees_survey: "0870DD19-8C26-6341-D666-9DB4E6451910",
        _kf_User: "62D89C73-ECBD-4D36-1C48-FE28DA2F2562",
        full_name: "Kandayoge Mariya",
        _kf_Station: "CD21DEFD-F66F-CD48-BDC1-972B2A31ADD6",
        _kf_Supplier: "333C25C9-A8F4-487F-A92E-1513CB194E18",
        _kf_tree_details: "E14F433E-FAD1-B720-0E7B-03A757721862",
        _kf_pests_diseases: "D82CA864-1A3E-1782-1006-71C4A4D35D56",
        _kf_pests_observation: "1F068BB5-DBA6-C24A-13A5-C6F6AB06ED83",
        _kf_courses_observation: "75A84DD9-B075-8E44-554C-3895B36DB634",
        station_name: "Mayaga",
        group_id: "MYG001",
        farmer_id: "F23396A",
        farmer_name: "BYIRINGIRO cedrick",
        national_id: "1199780005351095",
        phone: "0782391045",
        year_of_birth: "1997",
        gender: "M",
        child_1_to_20_yrs: 2,
        child_20_to_30_yrs: 2,
        income_source_main: "farming",
        coffee_trees: 700,
        coffee_farms: 12,
        trees_10_20: 345,
        trees_20_more: 456,
        trees_less_than_10: 234,
        shade_trees: 123,
        natural_shade_trees: 123,
        nitrogen_fixing_shade_trees: 123,
        other_crops_in_coffee_farm: "none",
        other_crops_in_farm: "none",
        latitude: 37.4220936,
        longitude: -122.083922,
        status: "new",
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rtc_trees_survey", null, {});
  },
};
