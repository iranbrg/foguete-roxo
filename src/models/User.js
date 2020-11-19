import { Model, DataTypes } from "sequelize";

class User extends Model {
    static init(db) {
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
            },
            {
                sequelize: db,
                tableName: "users",
            }
        );
    }
}

export default User;
