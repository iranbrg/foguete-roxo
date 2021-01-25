/* eslint-disable quotes */
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_tokens", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()")
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        field: "user_id"
      },
      token: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()")
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
    await queryInterface.dropTable("user_tokens");
  }
};
