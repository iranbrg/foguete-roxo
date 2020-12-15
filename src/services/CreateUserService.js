import { hash } from "bcryptjs";
import UsersRepository from "../ropositories/UsersRepository";
import User from "../models/User";
import AppError from "../errors/AppError";

export default class CreateUserService {
    static async execute({ name, email, password }) {
        const checkUserExists = await User.findOne({ where: { email } });

        if (checkUserExists) {
            throw new AppError("Email address already in use");
        }

        const hashedPassword = await hash(password, 8);

        const user = await UsersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    }
}
