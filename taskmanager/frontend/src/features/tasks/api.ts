import { type Task, Method } from "../../shared/types";
import { API_URL } from "../../shared/constants"

export const getTasks = async (filters?: {
    status?: string;
    priority?: string;
    deadline?: string;
}): Promise<Task[]> => {
    try {
        const queryParams = new URLSearchParams();

        if (filters?.status) {
            queryParams.append('status', filters.status);
        }
        if (filters?.priority) {
            queryParams.append('priority', filters.priority);
        }
        if (filters?.deadline) {
            queryParams.append('deadline', filters.deadline);
        }

        const currentURL = queryParams.toString() ? `${API_URL}?${queryParams.toString()}` : API_URL;
        const response = await fetch(currentURL);
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
        return task
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch Task');
    }
}

export const postTask = async (Task: Omit<Task, 'id'>): Promise<Task> => {
    try {
        const response = await fetch(`${API_URL}`, {
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
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update Task');
    }
}
