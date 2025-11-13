import { z } from 'zod';

export const TaskStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
} as const;

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
};

export const StatusSchema = z.enum(Object.values(TaskStatus));

export const PrioritySchema = z.enum(Object.values(TaskPriority));

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  status: StatusSchema,
  priority: PrioritySchema,
  deadline: z.union([z.string(), z.date()]),
});

export type Task = z.infer<typeof TaskSchema>;

export const ValidationTaskSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters long' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  status: StatusSchema,
  priority: PrioritySchema,
  deadline: z
    .string()
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();

      selected.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return selected >= today;
    },
      { message: 'Deadline must be in the future' }
    ),
})
