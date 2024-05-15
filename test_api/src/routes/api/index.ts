import { Router } from 'express';
import { usersRouter } from './users';
import { testRouter } from './test';

export const appRouter = Router();

appRouter.use('/users', usersRouter);
appRouter.use('/test', testRouter);
