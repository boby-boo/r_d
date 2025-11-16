import { HttpError, TaskQuerySchema } from '../types/task.types';
import { Task } from '../models/task.model';
import { CreateTaskSchema, UpdateTaskSchema, TaskQuery } from '../types/task.types';
import { Op } from 'sequelize';


export async function listTasks(rawQuery?: unknown) {
  const query: Partial<TaskQuery> = rawQuery ? TaskQuerySchema.parse(rawQuery) : {};

  const where: Record<string, any> = {};

  if (query.status) {
    where.status = { [Op.in]: query.status };
  }

  if (query.priority) {
    where.priority = { [Op.in]: query.priority };
  }

  if (query.deadline) {
    const date = new Date(query.deadline);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    where.deadline = {
      [Op.gte]: date,
      [Op.lt]: nextDay,
    };
  }

  return Task.findAll({ where });
}

export async function getTaskById(id: string) {
  const task = await Task.findByPk(id);
  if (!task) throw new HttpError(404, 'Task not found');
  return task;
}

export async function createTask(raw: unknown) {
  const data = CreateTaskSchema.parse(raw);
  const task = await Task.create(data);
  return task;
}

export async function updateTask(id: string, raw: unknown) {
  const patch = UpdateTaskSchema.parse(raw);
  const task = await Task.findByPk(id);
  if (!task) throw new HttpError(404, 'Task not found');
  await task.update(patch);
  return task;
}

export async function deleteTask(id: string) {
  const task = await Task.findByPk(id);
  if (!task) throw new HttpError(404, 'Task not found');
  await task.destroy();
}
