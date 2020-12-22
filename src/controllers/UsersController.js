import container from "../container";

const usersRepository = container.resolve("usersRepository");
const createUserService = container.resolve("createUserService");

export default class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body;

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        // Can't delete propreties from the `user` object, so that a copy of it
        // must be created
        const userWithoutPassword = Object.assign({}, user.dataValues);
        delete userWithoutPassword.password;

        res.json(userWithoutPassword);
    }

    async index(req, res) {
        const users = await usersRepository.getUsers();

        res.json(users);
    }
}
