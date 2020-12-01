import User from "../models/User";
import Tech from "../models/Tech";

export default {
    async index(req, res) {
        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {
            include: {
                association: "techs",
                through: { attributes: [] }
            }
        });

        res.json(user.techs);
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

        await user.addTech(tech);

        res.json(tech);
    },

    async delete(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const tech = await Tech.findOne({
            where: { name }
        })

        if (!tech) {
            return res.status(400).json({ error: "Tech not found" });
        }

        await Tech.removeTech(name);

        res.json();
    }
}
