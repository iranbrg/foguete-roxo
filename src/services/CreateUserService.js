import { hash } from "bcryptjs";
import User from "../models/User";
import AppError from "../errors/AppError";

export default class CreateUserService {
  constructor({ usersRepository }) {
    this._userRepository = usersRepository;
  }

  async execute({ name, email, password }) {
    const checkUserExists = await User.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError("Email address already in use");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this._userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
  }
}
