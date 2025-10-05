import { TaskPriority, TaskStatus } from '../constants';
import type { Priority, Status, Task, TaskNormalized } from '../dto/Task';

const isStatus = (v: unknown): v is Status =>
  v === 'todo' || v === 'in_progress' || v === 'done';

const isPriority = (v: unknown): v is Priority =>
  v === 'low' || v === 'medium' || v === 'high';

const toDateString = (v: string | Date): string => {
  if (v instanceof Date) return v.toISOString();
  return v;
};

export type ValidationIssue = { index: number; message: string };

export const validateAndNormalizeTasks = (raw: unknown[]): {
  valid: TaskNormalized[];
  errors: ValidationIssue[];
} => {
  const valid: TaskNormalized[] = [];
  const errors: ValidationIssue[] = [];

  raw.forEach((item, index) => {
    const t = item as Task;

    if (t == null || typeof t !== 'object') {
      errors.push({ index, message: 'Not an object' });
      return;
    }
    if (t.id == null) {
      errors.push({ index, message: 'Missing id' });
      return;
    }
    if (typeof t.title !== 'string' || !t.title.trim()) {
      errors.push({ index, message: 'Invalid or missing title' });
      return;
    }
    if (typeof t.description !== 'string') {
      errors.push({ index, message: 'Invalid or missing description' });
      return;
    }
    if (t.createdAt == null) {
      errors.push({ index, message: 'Missing createdAt' });
      return;
    }
    if (t.deadline == null) {
      errors.push({ index, message: 'Missing deadline' });
      return;
    }

    const status = isStatus(t.status) ? t.status : TaskStatus.TODO;
    const priority = isPriority(t.priority) ? t.priority : TaskPriority.LOW;

    const normalized: TaskNormalized = {
      id: t.id,
      title: t.title,
      description: t.description,
      createdAt: toDateString(t.createdAt),
      deadline: toDateString(t.deadline),
      status,
      priority
    };

    valid.push(normalized);
  });

  return { valid, errors };
}
