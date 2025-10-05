import type { Status, Task, TaskId, TaskNormalized } from './Task';

export type GetTaskById = (id: TaskId, tasks: Task[]) => void;
export type FindTaskById = (id: TaskId, tasks: Task[]) => Task | undefined;
export type DeleteTask = (id: TaskId, tasks: Task[]) => void;
export type UpdateTask = <K extends keyof Task>(
    tasks: Task[],
    id: TaskId,
    key: K,
    value: Task[K]
) => void;
export type FilterTaskByStatus = (status: Status, tasks: Task[]) => void;
export type CreateTask = (data: Omit<Task, 'id' | 'createdAt'>, tasks: TaskNormalized[]) => void;
export type CheckTaskDeadlineStatus = (tasks: TaskNormalized[], id: TaskId) => void;