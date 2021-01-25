import { isAfter, addHours } from "date-fns";
import AppError from "../errors/AppError";

export default class ResetPasswordService {
  constructor({ usersRepository, userTokensRepository, hashProvider }) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.hashProvider = hashProvider;
  }

  async execute({ token, password }) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User token doesn't exist", 401);
    }

    const expirationTimeLimit = addHours(userToken.createdAt, 2);

    if (isAfter(Date.now(), expirationTimeLimit)) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User doesn't exist", 401);
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
