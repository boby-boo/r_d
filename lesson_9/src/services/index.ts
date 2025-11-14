import { type Task } from "../types";
import { API_URL } from "../constants/index"
import { Method } from "../types";

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch tasks');
    }
}

export const getTaskById = async (id: string): Promise<Task> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const task = await response.json();
        return task;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch Task');
    }
}

export const postTask = async (Task: Omit<Task, 'id'>): Promise<Task> => {
    try {
        const response = await fetch(API_URL, {
            method: Method.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Task),
        });
        const task = await response.json();
        return task;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to post Task');
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
        return updatedTask;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update Task');
    }
}
