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

export const StatusSchema = z.enum([
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
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
  createdAt: z.string().datetime(),
  status: StatusSchema,
  priority: PrioritySchema,
  deadline: z.string().datetime()
});

export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  status: StatusSchema,
  priority: PrioritySchema,
  deadline: z.string().datetime().refine((iso) => {
    const selected = new Date(iso);
    const now = new Date();
    return selected.getTime() >= new Date(
      now.getFullYear(), now.getMonth(), now.getDate()
    ).getTime();
  }, 'Deadline must be in the future')
});

export const UpdateTaskSchema = CreateTaskSchema.partial();

const MultiOrSingleEnum = (schema: z.ZodEnum<Record<string, string>>) =>
  z.union([schema, z.array(schema)])
    .transform((v): string[] => {
      if (Array.isArray(v)) return v.flatMap(s => s.split(','));
      return v.split(',');
    });

export const TaskQuerySchema = z.object({
  createdAt: z.string().date().optional(),
  status: MultiOrSingleEnum(StatusSchema),
  priority: MultiOrSingleEnum(PrioritySchema)
});
export type TaskQuery = z.infer<typeof TaskQuerySchema>;

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}
