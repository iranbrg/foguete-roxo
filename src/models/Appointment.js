import { Model, DataTypes } from "sequelize";

export default class Appointment extends Model {
  static init(db) {
    super.init(
      {
        provider_id: { type: DataTypes.STRING },
        date: { type: DataTypes.DATE }
      },
      {
        sequelize: db,
        tableName: "appointments"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "provider_id", as: "users" });
  }
}
