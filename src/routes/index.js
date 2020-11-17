import { Router } from 'express';
import appointmentsRouter from './appointmentsRoutes';

const router = Router();

router.use('/appointments', appointmentsRouter);

export default router;
