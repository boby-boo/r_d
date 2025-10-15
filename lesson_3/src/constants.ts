import type { Task } from './dto/Task';

export const TaskStatus = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
} as const;


export const TaskPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
} as const

export type UpdateTask = <K extends keyof Task>(
    id: number,
    key: K,
    value: Task[K]
) => void;
