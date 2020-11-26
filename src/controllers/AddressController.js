import Address from "../models/Address";
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
        const { zipcode, street, number} = req.body;
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const address = await Address.create({ user_id,  zipcode, street, number });

        res.json(address);
    }
}
