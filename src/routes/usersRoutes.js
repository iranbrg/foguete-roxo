import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload"
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UsersController from "../controllers/UsersController";
import UsersAvatarController from "../controllers/UsersAvatarController";

const router = Router();
const upload = multer({ storage: uploadConfig.storage });

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

router.route("/")
    .get(usersController.index)
    .post(usersController.create);

router.patch("/avatar", ensureAuthenticated, upload.single("avatar"), usersAvatarController.update);

export default router;
