import { getDaysInMonth, getDate } from "date-fns";

export default class ListProviderMonthAvailabilityService {
  constructor({ appointmentsRepository }) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ providerId, month, year }) {
    const appointments = await this.appointmentsRepository.getAppointmentsInMonthFromProvider(
      {
        providerId,
        month,
        year
      }
    );

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const availability = eachDayInMonth.map(day => {
      const appointmentsAvailable = appointments.filter(
        appointment => getDate(appointment.date) === day
      );

      return {
        day,
        available: appointmentsAvailable.length < 10
      };
    });

    return availability;
  }
}
