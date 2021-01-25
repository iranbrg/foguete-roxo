import AppError from "../errors/AppError";

export default class CreateUserService {
  constructor({ usersRepository, hashProvider }) {
    this.userRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already in use");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
  }
}
