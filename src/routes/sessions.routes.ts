import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
const sessionsRouter = Router();


sessionsRouter.post('/', async(request, response) => {
  try {
      const {email,password} = request.body;

      const authenticateUser = new AuthenticateUserService();

      const {user,token} = await authenticateUser.execute({
          email,
          password,
      });

      const {password: trash, ...user_without_password} = user;

    return response.json({user_without_password , token});
  }
  catch (err){
    return response.status(400).json({error : err.message});
  }
});

export default sessionsRouter;
