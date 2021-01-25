import { Router } from "express";
import RecoveryPasswordController from "../controllers/RecoveryPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const router = Router();

const recoveryPasswordController = new RecoveryPasswordController();
const resetPasswordController = new ResetPasswordController();

router.route("/recovery").post(recoveryPasswordController.create);
router.route("/reset").post(resetPasswordController.create);

export default router;
