import { Router } from "express";
import appointments from "./appointmentsRoutes";
import users from "./userRoutes";
import addresses from "./addresses.routes";
import techs from "./techs.routes";

const router = Router();

router.use("/appointments", appointments);
router.use("/users", users);
router.use("/users", addresses);
router.use("/users", techs);

export default router;
