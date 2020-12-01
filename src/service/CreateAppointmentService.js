import { startOfHour } from "date-fns";
import AppointmentsRepository from "../ropositories/AppointmentsRepository";

export default class CreateAppointmentService {
    static async execute({ provider, date }) {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await AppointmentsRepository.findByDate(
            appointmentDate
        );

        if (findAppointmentInSameDate) {
            throw new Error("This appointment is already booked");
        }

        const appointment = await AppointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        return appointment;
    }
}
