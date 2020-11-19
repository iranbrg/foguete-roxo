import User from "../models/User";

export default {
    async store(req, res) {
        const { name, email } = req.body;
        const user = await User.create({ name, email });

        res.json(user);
    },
};
