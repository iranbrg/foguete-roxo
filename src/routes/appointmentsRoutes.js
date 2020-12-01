import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../ropositories/AppointmentsRepository";
import CreateAppointmentService from "../service/CreateAppointmentService";

const router = Router();

router.route("/")
    .get(async (req, res) => res.json(await AppointmentsRepository.getAppointments()))
    .post(async (req, res) => {
        try {
            const { provider, date } = req.body;

            const parsedDate = parseISO(date);

            const appointment = await CreateAppointmentService.execute({
                provider,
                date: parsedDate,
            });

            res.json(appointment);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

export default router;
