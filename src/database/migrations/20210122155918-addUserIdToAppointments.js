export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("appointments", "user_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("appointments", "user_id");
  }
};
