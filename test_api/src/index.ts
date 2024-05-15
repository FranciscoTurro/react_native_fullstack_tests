import dotenv from 'dotenv';
import express from 'express';
import { appRouter } from './routes/api';

dotenv.config();

const app = express();

app.use('/api', appRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
