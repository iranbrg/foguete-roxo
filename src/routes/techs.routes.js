import { Router } from "express";
import TechsController from "../controllers/TechsController";

const router = Router();

router.route('/:user_id/techs')
    .get(TechsController.index)
    .post(TechsController.store);

export default router;
