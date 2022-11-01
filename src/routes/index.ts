import { Router } from 'express';
import { UserRouter } from './user.route';

export const MainRouter = Router();

MainRouter.use(UserRouter);

MainRouter.get('/', (_, res) => {
	res.send('Hi');
});
