const userTokens = [];

export default class UserTokensRepository {
  async create({ userId }) {
    const userToken = {
      id: Math.round(Math.random() * 1000000).toString(),
      token: Math.round(Math.random() * 1000000).toString(),
      user_id: userId,
      createdAt: new Date()
    };

    userTokens.push(userToken);

    return userToken;
  }

  async findByToken(token) {
    const userToken = userTokens.find(findToken => findToken.token === token);

    return userToken;
  }
}

// Nasty JS doesn't support class variables, therefore I had to do this crap
UserTokensRepository.prototype.userTokens = userTokens;
