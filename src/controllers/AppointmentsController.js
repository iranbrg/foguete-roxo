import { parseISO } from "date-fns";
import container from "../container";

const appointmentsRepository = container.resolve("appointmentsRepository");
const createAppointmentService = container.resolve("createAppointmentService");

export default class AppointmentsController {
    async create(req, res) {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const appointment = await createAppointmentService.execute({
            provider_id,
            date: parsedDate,
        });

        res.json(appointment);
    }

    async index(req, res) {
        const appointments = await appointmentsRepository.getAppointments();
        res.json(appointments);
    }
}
