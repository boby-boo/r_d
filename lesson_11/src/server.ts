import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ZodError } from 'zod';
import { taskRouter } from './routes/tasks.js';
import { HttpError } from './types/task.types.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/tasks', taskRouter);

app.use((req, _res, next) => {
  next(new HttpError(404, `${req.method} ${req.url} not found`));
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'ValidationError',
      details: err.message
    });
  }
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err);
  return res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT ?? '3000';
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
