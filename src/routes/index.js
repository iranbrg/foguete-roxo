import { Router } from 'express';
import appointmentsRouter from './appointmentsRoutes';
import userRouter from './userRoutes';

const router = Router();

router.use('/appointments', appointmentsRouter);
router.use('/user', userRouter);

export default router;
