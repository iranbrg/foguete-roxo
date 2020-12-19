import { Router } from "express";
import CreateSessionService from "../services/CreateSessionService";

const router = Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    const createSessionService = new CreateSessionService();
    const user = await createSessionService.execute({
    email,
    password,
    });

    res.json(user);

});

export default router;
