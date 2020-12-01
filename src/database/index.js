import Sequelize from "sequelize";
import dbConfig from "../config/database";
import Appointment from "../models/Appointment";

const db = new Sequelize(dbConfig);

Appointment.init(db);

export default db;
