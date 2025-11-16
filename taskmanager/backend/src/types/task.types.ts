import { z } from 'zod';

export const TaskStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  DONE: 'done',
} as const;

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const StatusSchema = z.enum([
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.REVIEW,
  TaskStatus.DONE,
]);

export const PrioritySchema = z.enum([
  TaskPriority.LOW,
  TaskPriority.MEDIUM,
  TaskPriority.HIGH,
]);

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  status: StatusSchema,
  priority: PrioritySchema,
  deadline: z.coerce.date(),
});

export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  status: StatusSchema,
  priority: PrioritySchema,
  deadline: z.coerce.date().refine((iso) => {
    const selected = new Date(iso);
    const today = new Date();

    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selected >= today;
  }, 'Deadline must be in the future')
});

export const UpdateTaskSchema = CreateTaskSchema.partial();

const MultiOrSingleEnum = (schema: z.ZodEnum<Record<string, string>>) =>
  z.preprocess((v) => {
    if (typeof v === 'string') return v.split(',').map(s => s.trim()).filter(Boolean);
    return v;
  }, z.array(schema));

export const TaskQuerySchema = z.object({
  status: MultiOrSingleEnum(StatusSchema).optional(),
  priority: MultiOrSingleEnum(PrioritySchema).optional(),
  deadline: z.coerce.date().optional(),
});

export type TaskQuery = z.infer<typeof TaskQuerySchema>;

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}
