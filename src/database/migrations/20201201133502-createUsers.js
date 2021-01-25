/* eslint-disable quotes */
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      // eslint-disable-next-line quotes
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()")
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "created_at"
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "updated_at"
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'DROP EXTENSION IF EXISTS "uuid-ossp";'
    );
    await queryInterface.dropTable("users");
  }
};
