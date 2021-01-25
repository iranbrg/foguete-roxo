import { Router } from "express";
import appointmentsRoutes from "./appointmentsRoutes";
import usersRoutes from "./usersRoutes";
import sessionsRoutes from "./sessionsRoutes";
import errorHandler from "../middlewares/errorHandler";
import passwordsRoutes from "./passwordsRoutes";
import profilesRoutes from "./profilesRoutes";
import providersRoutes from "./providersRoutes";

const router = Router();

router.use("/appointments", appointmentsRoutes);
router.use("/users", usersRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/passwords", passwordsRoutes);
router.use("/profiles", profilesRoutes);
router.use("/providers", providersRoutes);

router.use(errorHandler);

export default router;
