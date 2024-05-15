import { Router } from 'express';
import { testController } from '../../controllers/test';
import { isAuth } from '../../middleware/auth';

export const testRouter = Router();

testRouter.use(isAuth);
testRouter.post('/', testController.test);
