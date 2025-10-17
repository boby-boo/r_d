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

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
};

export type Status = typeof TaskStatus[keyof typeof TaskStatus];
export type Priority = typeof TaskPriority[keyof typeof TaskPriority];

export type Task = {
    id: string;
    title: string;
    description: string;
    createdAt: string | Date;
    status?: Status;
    priority?: Priority;
    deadline: string | Date;
}
