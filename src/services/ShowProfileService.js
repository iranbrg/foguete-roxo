import AppError from "../errors/AppError";

export default class CreateUserService {
  constructor({ usersRepository }) {
    this.userRepository = usersRepository;
  }

  async execute(userId) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User doesn't exist");
    }

    return user;
  }
}
