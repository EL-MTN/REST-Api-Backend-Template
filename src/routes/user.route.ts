import { Router } from 'express';

import * as UserController from '../controllers/user.controller';

export const UserRouter = Router();

UserRouter.post('/signup', UserController.CreateUser);

UserRouter.post('/login', UserController.LoginUser);
