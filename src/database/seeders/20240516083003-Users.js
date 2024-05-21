/* eslint-disable @typescript-eslint/no-unused-vars */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('users', [
      {
        id: '6b61cc9b-2d01-4f97-91fc-33bc92a8727d',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
        email: 'admin@admin.com',
        password:
          '$2a$10$HRzDgICLOe/0IZbcL84UqOyS3.IRcIUI1KDmFrDjKOeIL1LfgAXie' /** password: password */,
        role_id: '58e88f4b-92c1-4627-96d9-9b6d068f2f16',
        phone: '0788888888',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
