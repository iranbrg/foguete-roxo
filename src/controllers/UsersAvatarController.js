import container from "../container";

export default class UsersAvatarController {
  async update(req, res) {
    const { id } = req.user.id;

    const uploadAvatarService = container.resolve("uploadAvatarService");

    const user = await uploadAvatarService.execute({
      id,
      avatarFilename: req.file.filename
    });

    // Can't delete propreties from the `user` object, so that a copy of it
    // must be created
    const userWithoutPassword = { ...user.dataValues };
    delete userWithoutPassword.password;

    res.json(userWithoutPassword);
  }
}
