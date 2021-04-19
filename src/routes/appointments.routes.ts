import {request, response, Router} from 'express';
import {uuid} from 'uuidv4';

const appoinstmentsRouter = Router();

const appointments=[];

appoinstmentsRouter.post('/',(request,response)=>{
    const {provider,date} = request.body;

    const appointment = {
        id:uuid(),
        provider,
        date
    }
    appointments.push(appointment)
    return response.json(appointment);
});

export default appoinstmentsRouter ;