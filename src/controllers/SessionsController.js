import CreateSessionService from "../services/CreateSessionService";

export default class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const createSessionService = new CreateSessionService();

    const user = await createSessionService.execute({
      email,
      password
    });

    res.json(user);
  }
}
