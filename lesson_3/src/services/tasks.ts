import { TaskPriority, TaskStatus } from '../constants';
import type { Status, Task, TaskNormalized } from '../dto/Task';

export const findTaskById = (id: number, tasks: Task[]): Task | undefined => {
    return tasks.find((task) => task.id === id) as Task;
}

export const getDetailsById = (id: number, tasks: Task[]): void => {
    const task = findTaskById(id, tasks);

    if (task) {
        const { title, description, createdAt, status, priority, deadline } = task;
        console.log(`
            Task id ${id}:     
            Title: ${title}
            Description: ${description}
            CreatedAt: ${createdAt}
            Status: ${status || 'Not set'}
            Priority: ${priority || 'Not set'}
            Deadline: ${deadline}
            `
        )
        return;
    }

    console.log(`Task ${id} not found`);
}

export const deleteTask = (id: number, tasks: Task[]): void => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        console.log(`Task ${id} was deleted`);
    } else {
        console.log(`Task ${id} not found`);
    }
}

export const updateTask = (tasks: Task[], id: number, properties: Partial<Task>): void => {
    const task = findTaskById(id, tasks);
    if (task) {
        Object.assign(task, properties);
        console.log(`Task ${id} updated`, task);
    } else {
        console.log(`Task ${id} not found`);
    }
}

export const filterTaskByStatus = (status: Status, tasks: Task[]) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    console.log(`Filtered Tasks`, filteredTasks);
}

export const createTask = (data: Omit<Task, 'id' | 'createdAt'>, tasks: TaskNormalized[]) => {
    const id = Date.now();
    const createdAt = new Date().toISOString();

    const task: TaskNormalized = {
        id,
        title: data.title,
        description: data.description,
        createdAt,
        deadline: typeof data.deadline === 'string' ? data.deadline : data.deadline.toISOString(),
        status: data.status ?? TaskStatus.TODO,
        priority: data.priority ?? TaskPriority.LOW
    };
    tasks.push(task);
};

export const checkTaskDeadlineStatus = (tasks: TaskNormalized[], id: number) => {
    const task = findTaskById(id, tasks);
    if (!task) return;

    const todayMoreThanDeadline = new Date() > new Date(task.deadline);
    const statusIsNotDone = task.status !== TaskStatus.DONE;

    if (todayMoreThanDeadline && statusIsNotDone) {
        console.log(`Task ${id} is overdue`);
    } else {
        console.log(`Task ${id} is already up to date`);
    }
}
