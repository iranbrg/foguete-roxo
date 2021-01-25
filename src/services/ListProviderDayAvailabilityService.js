import { getHours, isAfter } from "date-fns";

export default class ListProviderDayAvailabilityService {
  constructor({ appointmentsRepository }) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ providerId, day, month, year }) {
    const appointments = await this.appointmentsRepository.getAppointmentsInDayFromProvider(
      {
        providerId,
        day,
        month,
        year
      }
    );

    const eachHourInDay = Array.from({ length: 10 }, (_, i) => i + 8);

    const availability = eachHourInDay.map(hour => {
      const appointmentsAvailable = appointments.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      const currentDate = new Date(Date.now());
      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !appointmentsAvailable && isAfter(compareDate, currentDate)
      };
    });

    return availability;
  }
}
