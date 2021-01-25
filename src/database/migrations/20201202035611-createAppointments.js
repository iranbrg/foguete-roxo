export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("appointments", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()")
      },
      providerId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        field: "provider_id"
      },
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("appointments");
  }
};
