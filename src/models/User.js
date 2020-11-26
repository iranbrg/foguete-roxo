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

    static associate(models) {
        this.hasMany(models.Address, { foreignKey: "user_id", as: "user"});
        this.belongsToMany(models.Tech, { through: "user_techs", foreignKey: "user_id", as: "techs" });
    }
}

export default User;
