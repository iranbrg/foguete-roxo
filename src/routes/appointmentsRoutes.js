import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../ropositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const router = Router();

router.use(ensureAuthenticated);

router.route("/")
    .get(async (req, res) => {
        console.log(req.user);
        const appointments = await AppointmentsRepository.getAppointments();
        res.json(appointments);
    })
    .post(async (req, res) => {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const appointment = await CreateAppointmentService.execute({
            provider_id,
            date: parsedDate,
        });

        res.json(appointment);
    });

export default router;
