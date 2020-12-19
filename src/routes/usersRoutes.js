import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload"
import UsersRepository from "../ropositories/UsersRepository";
import CreateUserService from "../services/CreateUserService";
import UploadService from "../services/UploadService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const router = Router();
const upload = multer({ storage: uploadConfig.storage });

const usersRepository = new UsersRepository();

router.route("/")
    .get(async (req, res) => res.json(await usersRepository.getUsers()))
    .post(async (req, res) => {
        const { name, email, password } = req.body;

        const createUserService = new CreateUserService(usersRepository);

        const user = await createUserService.execute({
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
    const UploadService = new UploadService();
    const user = await uploadService.execute({
        id: req.user.id,
        avatarFilename: req.file.filename
    });

    res.json(user);
})

export default router;
