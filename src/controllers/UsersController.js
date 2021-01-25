import container from "../container";

export default class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const createUserService = container.resolve("createUserService");

    const user = await createUserService.execute({
      name,
      email,
      password
    });

    // Can't delete propreties from the `user` object, so that a copy of it
    // must be created
    const userWithoutPassword = { ...user.dataValues };
    delete userWithoutPassword.password;

    res.json(userWithoutPassword);
  }

  async update(req, res) {
    const { id } = req.user;
    const {
      name: newName,
      email: newEmail,
      password: oldPassword,
      new_password: newPassword
    } = req.body;

    const updateProfileService = container.resolve("updateProfileService");

    const user = await updateProfileService.execute({
      id,
      newName,
      newEmail,
      oldPassword,
      newPassword
    });

    // Can't delete propreties from the `user` object, so that a copy of it
    // must be created
    const userWithoutPassword = { ...user.dataValues };
    delete userWithoutPassword.password;

    res.json(userWithoutPassword);
  }

  async show(req, res) {
    const { id: userId } = req.user;

    const showProfileService = container.resolve("showProfileService");

    const profile = await showProfileService.execute(userId);

    // Can't delete propreties from the `user` object, so that a copy of it
    // must be created
    const profileWithoutPassword = { ...profile.dataValues };
    delete profileWithoutPassword.password;

    res.json(profileWithoutPassword);
  }
}
