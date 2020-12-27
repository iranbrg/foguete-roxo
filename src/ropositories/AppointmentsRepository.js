import Appointment from "../models/Appointment";

export default class AppointmentsRepository {
  async create({ provider_id, date }) {
    const appointment = await Appointment.create({ provider_id, date });

    return appointment;
  }

  async findByDate(date) {
    const findAppointmentInSameDate = await Appointment.findOne({
      where: { date }
    });

    return findAppointmentInSameDate;
  }

  async getAppointments() {
    const appointments = await Appointment.findAll();

    return appointments;
  }
}
