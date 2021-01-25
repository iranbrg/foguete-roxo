import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentsController";

const router = Router();

const appointmentsController = new AppointmentsController();

router.use(ensureAuthenticated);

router.route("/").post(appointmentsController.create);

export default router;
