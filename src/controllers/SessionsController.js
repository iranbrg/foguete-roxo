import container from "../container";

export default class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const createSessionService = container.resolve("createSessionService");

    const { user, token } = await createSessionService.execute({
      email,
      password
    });

    // Can't delete propreties from the `user` object, so that a copy of it
    // must be created
    const userWithoutPassword = { ...user.dataValues };
    delete userWithoutPassword.password;

    res.json({ ...userWithoutPassword, token });
  }
}
