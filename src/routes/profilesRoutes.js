import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UsersController from "../controllers/UsersController";

const router = Router();

const usersController = new UsersController();

router.use(ensureAuthenticated);

router.route("/").get(usersController.show).put(usersController.update);

export default router;
