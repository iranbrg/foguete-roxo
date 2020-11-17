import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../ropositories/AppointmentsRepository";
import CreateAppointmentService from "../service/CreateAppointmentService";

const router = Router();

const appointments = new AppointmentsRepository();

router
    .route("/")
    .get((req, res) => res.json(appointments.getAppointments()))
    .post((req, res) => {
        try {
            const { provider, date } = req.body;

            const parsedDate = parseISO(date);

            const newAppointment = new CreateAppointmentService(appointments);

            const appointment = newAppointment.execute({
                provider,
                date: parsedDate,
            });

            res.json(appointment);
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    });

export default router;
