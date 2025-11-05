import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ZodError } from 'zod';
import { taskRouter } from './routes/tasks';
import { sequelize } from './models/index';
import { HttpError } from './types/task.types';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/', taskRouter);

app.use((_req, _res, next) => next(new HttpError(404, 'Not Found')));

app.use((err: unknown, res: express.Response) => {
  if (err instanceof ZodError) return res.status(400).json({ error: 'ValidationError', details: err.message });
  if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

if (process.env.NODE_ENV !== 'test') start();

export default app;
