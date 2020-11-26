import { Model, DataTypes } from "sequelize";

class Tech extends Model {
    static init(db) {
        super.init(
            {
                name: DataTypes.STRING,
            },
            {
                sequelize: db,
                tableName: "techs",
            }
        );
    }

    static associate(models) {
        this.belongsToMany(models.User, { through:"user_techs", foreignKey: "tech_id", as: "users" });
    }
}

export default Tech;
