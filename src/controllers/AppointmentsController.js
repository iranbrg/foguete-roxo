import { parseISO } from "date-fns";
import container from "../container";

export default class AppointmentsController {
  async create(req, res) {
    const { provider_id: providerId, date } = req.body;
    const { id } = req.user;

    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      "createAppointmentService"
    );

    const appointment = await createAppointmentService.execute({
      providerId,
      date: parsedDate,
      userId: id
    });

    res.json(appointment);
  }
}
