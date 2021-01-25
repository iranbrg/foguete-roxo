import { QueryTypes } from "sequelize";
import Appointment from "../models/Appointment";

export default class AppointmentsRepository {
  // eslint-disable-next-line camelcase
  async create({ providerId, date, userId }) {
    const appointment = await Appointment.create({
      providerId,
      date,
      userId
    });

    return appointment;
  }

  async findByDate(date) {
    const findAppointmentInSameDate = await Appointment.findOne({
      where: { date }
    });

    return findAppointmentInSameDate;
  }

  async getAppointmentsInMonthFromProvider({ providerId, month, year }) {
    const parsedMonth = month.toString().padStart(2, "0");

    const findAppointments = Appointment.sequelize.query(
      // eslint-disable-next-line quotes
      `SELECT * FROM appointments WHERE provider_id = '${providerId}' AND TO_CHAR(date, 'MM-YYYY') = '${parsedMonth}-${year}'`,
      {
        type: QueryTypes.SELECT,
        model: Appointment
      }
    );

    return findAppointments;
  }

  async getAppointmentsInDayFromProvider({ providerId, day, month, year }) {
    const parsedDay = day.toString().padStart(2, "0");
    const parsedMonth = month.toString().padStart(2, "0");

    // const findAppointments = await Appointment.sequelize.query(
    //   // eslint-disable-next-line quotes
    //   `SELECT * FROM appointments WHERE provider_id = '${providerId}' AND TO_CHAR(date, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
    //   {
    //     type: QueryTypes.SELECT,
    //     model: Appointment
    //   }
    // );

    const findAppointments = await Appointment.findAll({
      where: { providerId }
    });

    return findAppointments;
  }
}
