import { type Request, type Response, type NextFunction } from 'express';
import {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../services/task.service.js';
import { TaskQuerySchema } from '../types/task.types.js';

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = TaskQuerySchema.parse(req.query);
    const result = listTasks(query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const postTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = createTask(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const putTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const removeTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
