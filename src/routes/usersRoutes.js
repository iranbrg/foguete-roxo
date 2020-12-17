import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload"
import UsersRepository from "../ropositories/UsersRepository";
import CreateUserService from "../services/CreateUserService";
import UploadService from "../services/UploadService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const router = Router();
const upload = multer({ storage: uploadConfig.storage });

router.route("/")
    .get(async (req, res) => res.json(await UsersRepository.getUsers()))
    .post(async (req, res) => {
        const { name, email, password } = req.body;

        const user = await CreateUserService.execute({
            name,
            email,
            password
        });

        // Can't delete propreties from the `user` object, so that a copy of it
        // must be created
        const userWithoutPassword = Object.assign({}, user.dataValues);
        delete userWithoutPassword.password;

        res.json(userWithoutPassword);
    });

router.patch("/avatar", ensureAuthenticated, upload.single("avatar"), async (req, res) => {
    const user = await UploadService.execute({
        id: req.user.id,
        avatarFilename: req.file.filename
    });

    res.json(user);
})

export default router;
