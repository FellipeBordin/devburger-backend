'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('categories', 'path', {
    type: Sequelize.STRING,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('categories', 'path', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  });
}
