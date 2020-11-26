import { Model, DataTypes } from "sequelize";

class Address extends Model {
    static init(db) {
        super.init(
            {
                zipcode: DataTypes.STRING,
                street: DataTypes.STRING,
                number: DataTypes.INTEGER,
            },
            {
                sequelize: db,
                tableName: "addresses",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
}

export default Address;
