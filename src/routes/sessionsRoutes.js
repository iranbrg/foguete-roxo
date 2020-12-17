import { Router } from "express";
import CreateSessionService from "../services/CreateSessionService";

const router = Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    const user = await CreateSessionService.execute({
    email,
    password,
    });

    res.json(user);

});

export default router;
