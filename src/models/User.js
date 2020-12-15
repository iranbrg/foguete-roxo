import { Model, DataTypes } from "sequelize";

export default class User extends Model {
    static init(db) {
        super.init({
            name: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            avatar: { type: DataTypes.STRING },
        },
        {
            sequelize: db,
            tableName: "users"
        });
    }

    static associate(models) {
        this.hasMany(models.Appointment, { foreignKey: "provider_id", as: "appointments" });
    }
}
