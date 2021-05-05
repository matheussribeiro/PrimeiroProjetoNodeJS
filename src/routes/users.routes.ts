import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();


usersRouter.post('/', async(request, response) => {
  try {
    const {name,email,password} = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
        name,
        email,
        password,
    });
    const {password, ...user_without_password} = user;
    return response.json(user_without_password);
  }
  catch (err){
    return response.status(400).json({error : err.message});
  }
});

export default usersRouter;
