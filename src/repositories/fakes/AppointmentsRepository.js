import { isEqual, getDate, getMonth, getYear } from "date-fns";

const appointments = [];

export default class AppointmentsRepository {
  // eslint-disable-next-line camelcase
  async create({ providerId, date, userId }) {
    const appointment = {
      id: Math.round(Math.random() * 100000000).toString(),
      providerId,
      date,
      userId
    };

    appointments.push(appointment);

    return appointment;
  }

  async findByDate(date) {
    const findAppointmentInSameDate = appointments.find(appointment =>
      isEqual(appointment.date, date)
    );

    return findAppointmentInSameDate;
  }

  async getAppointmentsInMonthFromProvider({ providerId, month, year }) {
    const findAppointments = appointments.filter(appointment => {
      return (
        appointment.providerId === providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return findAppointments;
  }

  async getAppointmentsInDayFromProvider({ providerId, day, month, year }) {
    const findAppointments = appointments.filter(appointment => {
      return (
        appointment.providerId === providerId &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return findAppointments;
  }
}

// Nasty JS doesn't support class variables, therefore I had to do this crap
AppointmentsRepository.prototype.appointments = appointments;
