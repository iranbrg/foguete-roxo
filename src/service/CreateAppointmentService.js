const { startOfHour } = require("date-fns");

class CreateAppointmentService {
    constructor(appointments) {
        this._appointments = appointments;
    }

    execute({ provider, date }) {
        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = this._appointments.findByDate(
            appointmentDate
        );

        if (findAppointmentInSameDate) {
            throw new Error("This appointment is already booked");
        }

        const appointment = this._appointments.create({ provider, date: appointmentDate });

        return appointment;
    }
}

module.exports = CreateAppointmentService;
