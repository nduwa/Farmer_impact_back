"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rtc_farmer_group_assignment", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      _kf_farmer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_station: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      _kf_Supplier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kf_group_old: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kf_group_new: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assigned_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("new", "verified", "approved", "deleted"),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      uploaded_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rtc_farmer_group_assignment");
  },
};
