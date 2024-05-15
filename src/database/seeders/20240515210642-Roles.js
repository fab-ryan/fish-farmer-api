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

    await queryInterface.bulkInsert(
      'roles',
      [
        {
          id: '58e88f4b-92c1-4627-96d9-9b6d068f2f16',
          name: 'admin',
          description: 'Role for admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '0db36029-9287-4d78-8a7a-02305b1dceb2',
          name: 'operator',
          description: 'Role for operator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'a0798e07-3ba9-4aa7-b36f-4f472ecb1ccb',
          name: 'user',
          description: 'Role for user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '451f24d4-a329-4921-8d44-8504e3eb40d6',
          name: 'industrial',
          description: 'Role for industrial',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('roles', null, {});
  },
};
