import { Router } from "express";
import AddressController from "../controllers/AddressController";

const router = Router();

router.route('/:user_id/addresses')
    .get(AddressController.index)
    .post(AddressController.store);

export default router;
