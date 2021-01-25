import { sign } from "jsonwebtoken";
import jwtConfig from "../config/auth";
import AppError from "../errors/AppError";

export default class CreateSessionService {
  constructor({ usersRepository, hashProvider }) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const matchedPassword = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!matchedPassword) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const { secret, expiresIn } = jwtConfig.jwt;

    // TODO: wrap this into a async function
    const token = sign(
      {
        sub: user.id,
        iss: "gobarber-api",
        name: user.name,
        email: user.email
      },
      secret,
      { expiresIn }
    );

    return { user, token };
  }
}
