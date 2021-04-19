import {Router} from 'express';
import appoinstmentsRouter from './appointments.routes';
const routes = Router();

routes.use('/appointments',appoinstmentsRouter);

export default routes;