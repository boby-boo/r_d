import { TaskPriority, TaskStatus } from "../constants";

export type TaskId = string | number;
export type Status = typeof TaskStatus[keyof typeof TaskStatus];
export type Priority = typeof TaskPriority[keyof typeof TaskPriority];

export type Task = {
    id: TaskId;
    title: string;
    description: string;
    createdAt: string | Date;
    status?: Status;
    priority?: Priority;
    deadline: string | Date;
}

export type TaskNormalized = Required<Task>;