/* eslint-disable @typescript-eslint/no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company_website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cell: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      village: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('profiles');
  },
};
