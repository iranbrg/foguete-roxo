import { startOfHour } from "date-fns";
import AppError from "../errors/AppError";

export default class CreateAppointmentService {
    constructor({ appointmentsRepository }) {
        this._appointmentsRepository = appointmentsRepository;
    }
    
    async execute({ provider_id, date }) {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this._appointmentsRepository.findByDate(
            appointmentDate
        );

        if (findAppointmentInSameDate) {
            throw new AppError("This appointment is already booked");
        }

        const appointment = await this._appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        return appointment;
    }
}
