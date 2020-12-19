import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../models/User";
import jwtConfig from "../config/auth";
import AppError from "../errors/AppError";

export default class CreateSessionService {
    async execute({ email, password }) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new AppError("Incorrect email/password combination", 401);
        }

        const matchedPassword = await compare(password, user.password);

        if (!matchedPassword) {
            throw new AppError("Incorrect email/password combination", 401);
        }

        const { secret, expiresIn } = jwtConfig.jwt;

        // TODO: wrap this into a async function
        const token = sign({
            sub: user.id,
            iss: "gobarber-api",
            name: user.name,
            email: user.email
        }, secret, { expiresIn });

        // Can't delete propreties from the `user` object, so that a copy of it
        // must be created
        const userWithoutPassword = Object.assign({}, user.dataValues);
        delete userWithoutPassword.password;

        userWithoutPassword.token = token;

        return userWithoutPassword;
    }
}
