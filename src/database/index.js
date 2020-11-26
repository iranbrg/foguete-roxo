import Sequelize from "sequelize";
import dbConfig from "../config/database";

import User from "../models/User";
import Address from "../models/Address";
import Tech from "../models/Tech";

const db = new Sequelize(dbConfig);

User.init(db);
Address.init(db);
Tech.init(db);

User.associate(db.models);
Address.associate(db.models);
Tech.associate(db.models);

// (async () => await db.sync({ force: true }))();

export default db;
