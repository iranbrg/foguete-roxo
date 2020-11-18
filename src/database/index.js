import Sequelize from "sequelize";
import dbConfig from "../config/database";

const db = new Sequelize(dbConfig);

export default db;
