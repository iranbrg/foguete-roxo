import path from "path";
import fs from "fs";
import User from "../models/User";
import uploadConfig from "../config/upload";
import AppError from "../errors/AppError";

export default class UploadService {
    static async execute({ id, avatarFilename }) {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            throw new AppError("User doesn't exist", 401);
        }

        try {
            if (user.avatar) {
                const userAvatarFilePath = path.join(uploadConfig.dir, user.avatar);
                console.log(userAvatarFilePath);

                await fs.promises.stat(userAvatarFilePath);
                await fs.promises.unlink(userAvatarFilePath);
            }
        } finally {
            user.avatar = avatarFilename;
            await user.save();
        }

        // Can't delete propreties from the `user` object, so that a copy of it
        // must be created
        const userWithoutPassword = Object.assign({}, user.dataValues);
        delete userWithoutPassword.password;

        return user;
    }
}

