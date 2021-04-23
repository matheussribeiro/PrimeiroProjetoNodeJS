import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appoinstmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appoinstmentsRouter.get('/',(request,response) =>{

  const appointments = appointmentsRepository.All();
  
  return response.json(appointments);

});

appoinstmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'This appointment is already booked' });
  }
  const appointment = appointmentsRepository.create(provider, parsedDate);
  return response.json(appointment);
});

export default appoinstmentsRouter;
