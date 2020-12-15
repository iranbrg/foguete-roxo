import { startOfHour } from "date-fns";
import AppointmentsRepository from "../ropositories/AppointmentsRepository";
import AppError from "../errors/AppError";

export default class CreateAppointmentService {
    static async execute({ provider_id, date }) {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await AppointmentsRepository.findByDate(
            appointmentDate
        );

        if (findAppointmentInSameDate) {
            throw new AppError("This appointment is already booked");
        }

        const appointment = await AppointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        return appointment;
    }
}
