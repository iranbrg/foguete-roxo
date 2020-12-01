import { Router } from "express";
import appointmentsRoutes from "./appointmentsRoutes";

const router = Router();

router.use("/appointments", appointmentsRoutes);

export default router;
