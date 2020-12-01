import { Model, DataTypes } from "sequelize";

export default class Appointment extends Model {
    static init(db) {
        super.init({
            provider: { type: DataTypes.STRING },
            date: { type: DataTypes.DATE }
        },
        {
            sequelize: db,
            tableName: "appointments"
        });
    }
}
