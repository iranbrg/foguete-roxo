import Sequelize from "sequelize";
import dbConfig from "../config/database";
import Appointment from "../models/Appointment";
import User from "../models/User";
import UserToken from "../models/UserToken";

const db = new Sequelize(dbConfig);

User.init(db);
Appointment.init(db);
UserToken.init(db);

User.associate(db.models);
Appointment.associate(db.models);
UserToken.associate(db.models);

export default db;
