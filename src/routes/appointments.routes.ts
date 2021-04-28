import { Router } from 'express';
import {parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appoinstmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appoinstmentsRouter.get('/',(request,response) =>{

  const appointments = appointmentsRepository.All();
  
  return response.json(appointments);

});

appoinstmentsRouter.post('/', (request, response) => {
  try{
    const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentsRepository);
  
  const appointment = createAppointment.execute({date:parsedDate , provider});
  
  return response.json(appointment);
  }
  catch (err){
    return response.status(400).json({error : err.message});
  }
});

export default appoinstmentsRouter;
