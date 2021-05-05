import {Router} from 'express';
import appoinstmentsRouter from './appointments.routes';
import usersRouter from './users.routes'
const routes = Router();

routes.use('/appointments',appoinstmentsRouter);
routes.use('/users',usersRouter);

export default routes;