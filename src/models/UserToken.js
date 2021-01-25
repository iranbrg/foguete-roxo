import { Model, DataTypes } from "sequelize";

export default class UserToken extends Model {
  static init(db) {
    super.init(
      {
        userId: { type: DataTypes.STRING, field: "user_id" },
        token: { type: DataTypes.STRING }
      },
      {
        sequelize: db,
        tableName: "user_tokens"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "users"
    });
  }
}
