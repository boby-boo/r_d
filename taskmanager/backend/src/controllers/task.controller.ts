import { type Request, type Response, type NextFunction } from 'express';
import * as taskService from '../services/task.service';

export async function getTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const tasks = await taskService.listTasks(req.query);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function postTask(req: Request, res: Response, next: NextFunction) {
  try {
    const created = await taskService.createTask(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function putTask(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function removeTask(req: Request, res: Response, next: NextFunction) {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
