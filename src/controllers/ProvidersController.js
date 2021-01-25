import container from "../container";

export default class ProvidersController {
  async index(req, res) {
    const { id: userId } = req.user;

    const listProvidersService = container.resolve("listProvidersService");

    const providers = await listProvidersService.execute({ userId });

    // TODO: ditch providers password
    // Can't delete propreties from the `user` object, so that a copy of it
    // must be created
    // const providersWithoutPassword = { ...providers.dataValues };
    // delete providersWithoutPassword.password;

    // res.json(providersWithoutPassword);
    res.json(providers);
  }
}
