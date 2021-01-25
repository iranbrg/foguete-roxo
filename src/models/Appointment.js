import { Model, DataTypes } from "sequelize";

export default class Appointment extends Model {
  static init(db) {
    super.init(
      {
        providerId: { type: DataTypes.STRING, field: "provider_id" },
        date: { type: DataTypes.DATE },
        userId: { type: DataTypes.UUID, field: "user_id" }
      },
      {
        sequelize: db,
        tableName: "appointments"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "provider_id", as: "users" });
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}
