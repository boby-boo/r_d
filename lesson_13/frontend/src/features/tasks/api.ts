import { type Task, TaskSchema } from "./types";
import { API_URL } from "../../shared/constants"
import { Method } from "./types";

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        return tasks.map(TaskSchema.parse);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch tasks');
    }
}

export const getTaskById = async (id: string): Promise<Task> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const task = await response.json();
        return TaskSchema.parse(task);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch Task');
    }
}

export const postTask = async (Task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: Method.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Task),
        });
        const task = await response.json();
        return TaskSchema.parse(task);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to post Task: ${error}`);
    }
}

export const deleteTask = async (id: string) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: Method.DELETE,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete Task');
    }
}

export const updateTask = async (id: string, Task: Partial<Task>): Promise<Task> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: Method.PUT,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Task),
        });
        const updatedTask = await response.json();
        return TaskSchema.parse(updatedTask);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update Task');
    }
}
