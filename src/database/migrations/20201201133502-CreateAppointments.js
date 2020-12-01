export default {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('appointments', {
         id: {
             type: Sequelize.UUID,
             defaultValue: Sequelize.UUIDV4,
             primaryKey: true,
             allowNull: false
         },
         provider: {
             type: Sequelize.STRING,
             allowNull: false
         },
         date: {
             type: Sequelize.DATE,
             allowNull: false
         }
     });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('appointments');
  }
};
