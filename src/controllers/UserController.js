import User from "../models/User";

export default {
    async index(req, res) {
        const index = await User.findAll();

        res.json(index);
    },

    async store(req, res) {
        const { name, email } = req.body;
        const user = await User.create({ name, email });

        res.json(user);
    },
};
