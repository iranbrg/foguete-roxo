import { isEqual } from "date-fns";
import Appointment from '../models/Appointment';

export default class AppointmentsRepository {
    constructor() {
        this._appointments = [];
    }

    create({ provider, date }) {
        const appointment = new Appointment(provider, date);
        this._appointments.push(appointment);

        return appointment;
    }

    findByDate(date) {
        const findAppointmentInSameDate = this._appointments.find(appointment =>
            isEqual(appointment.date, date)
        );

        if (findAppointmentInSameDate) {
            return true;
        }

        return null;
    }

    getAppointments() {
        return this._appointments;
    }
}
