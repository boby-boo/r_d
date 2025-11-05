import { HttpError } from '../types/task.types';
import { Task } from '../models/Task.model';
import { User } from '../models/User.model';
import { CreateTaskSchema, UpdateTaskSchema } from '../types/task.types';

export async function listTasks() {
  return Task.findAll();
}

export async function getTaskById(id: string) {
  const task = await Task.findByPk(id, { include: [{ model: User, as: 'assignee' }] });
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
