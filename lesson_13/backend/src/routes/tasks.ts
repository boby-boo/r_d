import { Router } from 'express';
import {
  getTasks,
  getTask,
  postTask,
  putTask,
  removeTask
} from '../controllers/task.controller';

export const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTask);
taskRouter.post('/', postTask);
taskRouter.put('/:id', putTask);
taskRouter.delete('/:id', removeTask);
