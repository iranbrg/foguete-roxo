import { Op } from "sequelize";
import User from "../models/User";

export default class UsersRepository {
  async create({ name, email, password }) {
    const user = await User.create({ name, email, password });

    return user;
  }

  async save(user) {
    await user.save();
  }

  async findByEmail(email) {
    const user = User.findOne({ where: { email } });
    return user;
  }

  async findById(id) {
    const user = User.findOne({ where: { id } });
    return user;
  }

  async getAllProviders({ exceptUserId }) {
    let providers;

    if (exceptUserId) {
      providers = await User.findAll({
        where: {
          [Op.not]: {
            id: exceptUserId
          }
        }
      });
    } else {
      providers = await User.findAll();
    }

    return providers;
  }

  async getUsers() {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }
    });

    return users;
  }
}
