import { Router } from 'express';
import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appoinstmentsRouter = Router();
appoinstmentsRouter.use(ensureAuthenticated);

appoinstmentsRouter.get('/', async(request,response) =>{
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();
  
  return response.json(appointments);

});

appoinstmentsRouter.post('/', async(request, response) => {
 
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();
  
  const appointment = await createAppointment.execute({date:parsedDate , provider_id});
  
  return response.json(appointment);
  
});

export default appoinstmentsRouter;
