import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async(request, response) => {
 
  const {name,email,password} = request.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({
      name,
      email,
      password,
  });
  const {password: trash, ...user_without_password} = user;
  return response.json(user_without_password);
});

usersRouter.patch('/avatar',ensureAuthenticated,upload.single('avatar'),  async (request,response)=>{
 
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id:request.user.id,
    avatarFilename:request.file.filename,
  });

  const {password: trash, ...user_without_password} = user;
  return response.json(user_without_password);
});

export default usersRouter;
