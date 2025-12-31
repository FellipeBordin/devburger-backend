"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn("products", "offer", {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn("products", "offer", {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
}
