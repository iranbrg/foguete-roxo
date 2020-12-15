import User from '../models/User';

export default class UsersRepository {
    static async create({ name, email, password }) {
        const user = await User.create({ name, email, password });

        return user;
    }

    static async getUsers() {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
        });

        return users;
    }
}
