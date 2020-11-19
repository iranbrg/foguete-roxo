import Sequelize from "sequelize";
import dbConfig from "../config/database";

import User from "../models/User";

const db = new Sequelize(dbConfig);

User.init(db);

export default db;
