import { startOfHour, isBefore, getHours } from "date-fns";
import AppError from "../errors/AppError";

export default class CreateAppointmentService {
  constructor({ appointmentsRepository }) {
    this.appointmentsRepository = appointmentsRepository;
  }

  // eslint-disable-next-line camelcase
  async execute({ providerId, date, userId }) {
    const appointmentDate = startOfHour(date);

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "An appointment can only be created between 8AM and 18PM"
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("An appointment can't be created on a past date ");
    }

    if (userId === providerId) {
      throw new AppError("You can't create an appointment with yourself");
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
      userId
    });

    return appointment;
  }
}
