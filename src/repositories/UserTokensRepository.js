import UserToken from "../models/UserToken";

export default class UserTokensRepository {
  async create({ userId }) {
    const userToken = await UserToken.create({ userId });

    return userToken;
  }

  async findByToken(token) {
    const userToken = UserToken.findOne({ where: { token } });
    return userToken;
  }
}
