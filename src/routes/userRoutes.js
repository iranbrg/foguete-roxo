import { Router } from "express";
import userController from "../controllers/UserController";

const router = Router();

router.route('/')
    .get(userController.index)
    .post(userController.store);

export default router;
