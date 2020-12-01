import Appointment from '../models/Appointment';

export default class AppointmentsRepository {
    static async create({ provider, date }) {
        const appointment = await Appointment.create({ provider, date });

        return appointment;
    }

    static async findByDate(date) {
        const findAppointmentInSameDate = await Appointment.findOne({
            where: { date }
        });

        return findAppointmentInSameDate;
    }

    static async getAppointments() {
        const appointments = await Appointment.findAll();

        return appointments;
    }
}
