import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../ropositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const router = Router();

const appointmentsRepository = new AppointmentsRepository();

router.use(ensureAuthenticated);

router.route("/")
    .get(async (req, res) => {
        const appointments = await appointmentsRepository.getAppointments();
        res.json(appointments);
    })
    .post(async (req, res) => {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
        const appointment = await createAppointmentService.execute({
            provider_id,
            date: parsedDate,
        });

        res.json(appointment);
    });

export default router;
