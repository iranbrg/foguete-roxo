import User from "../models/User";

export default {
    async index(req, res) {
        const { user_id } = req.params;
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const addresses = await Address.findAll({
            where: {
                user_id,
            }
        });

        res.json(addresses);
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const [ tech ] = await Tech.findOrCreate({
            where: {
                name
            }
        })

        // let tech = await Tech.findAll({
        //     where: { name }
        // })

        // if (!tech) {
        //     tech = await Tech.create({ name });
        // }

        res.json(tech);
    }
}
