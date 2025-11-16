import { randomUUID } from 'node:crypto';
import {
  type Task,
  type TaskQuery,
  TaskSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  HttpError,
} from '../types/task.types.js';

const tasks: Task[] = [];

export function listTasks(query: TaskQuery): Task[] {
  let result = [...tasks];

  if (query.createdAt) {
    const target = query.createdAt;
    result = result.filter(
      (t) => new Date(t.createdAt).toISOString().slice(0, 10) === target
    );
  }

  if (query.status && query.status.length > 0) {
    const set = new Set(query.status);
    result = result.filter((t) => (t.status ? set.has(t.status) : false));
  }

  if (query.priority && query.priority.length > 0) {
    const set = new Set(query.priority);
    result = result.filter((t) => (t.priority ? set.has(t.priority) : false));
  }

  return result;
}

export function getTaskById(id: string): Task {
  const found = tasks.find((t) => t.id === id);
  if (!found) throw new HttpError(404, 'Task not found');
  return TaskSchema.parse(found);
}

export function createTask(raw: unknown): Task {
  const data = CreateTaskSchema.parse(raw);

  const task: Task = {
    ...data,
    id: randomUUID(),
    createdAt: new Date(),
  };

  tasks.push(task);
  return task;
}

export function updateTask(id: string, raw: unknown): Task {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) throw new HttpError(404, 'Task not found');

  const patch = UpdateTaskSchema.parse(raw);
  const updated = { ...tasks[idx], ...patch };
  const parsed = TaskSchema.parse(updated);

  tasks[idx] = parsed;
  return parsed;
}

export function deleteTask(id: string): void {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) throw new HttpError(404, 'Task not found');
  tasks.splice(idx, 1);
}
