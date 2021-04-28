import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';

interface Request{
    provider: string;
    date : Date;
}

class CreateAppointmentService {
    private appoinstmentsRepository : AppointmentsRepository;
    constructor(appointmentsRepository : AppointmentsRepository){
        this.appoinstmentsRepository = appointmentsRepository;
    }
    public execute({date,provider} : Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appoinstmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }
        const appointment = this.appoinstmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;

    }
}
export default CreateAppointmentService;