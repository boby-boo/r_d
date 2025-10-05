import { TaskPriority, TaskStatus } from '../constants';
import type { Task, TaskNormalized } from '../dto/Task';
import type { FindTaskById, GetTaskById, DeleteTask, UpdateTask, FilterTaskByStatus, CreateTask, CheckTaskDeadlineStatus } from '../dto/types';

export const findTaskById: FindTaskById = (id, tasks) => {
    return tasks.find((task) => String(task.id) === String(id)) as Task;
}

export const getDetailsById: GetTaskById = (id, tasks) => {
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

export const deleteTask: DeleteTask = (id, tasks) => {
    const index = tasks.findIndex((task) => String(task.id) === String(id));
    if (index !== -1) {
        tasks.splice(index, 1);
        console.log(`Task ${id} was deleted`);
    } else {
        console.log(`Task ${id} not found`);
    }
}

export const updateTask: UpdateTask = (tasks, id, key, value) => {
    const task = findTaskById(id, tasks);
    if (task) {
        task[key] = value;
        console.log(`Task ${id} updated`, task);
    } else {
        console.log(`Task ${id} not found`);
    }
}

export const filterTaskByStatus: FilterTaskByStatus = (status, tasks) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    console.log(`Filtered Tasks`, filteredTasks);
}

export const createTask: CreateTask = (data, tasks) => {
    const id = String(Date.now());
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

export const checkTaskDeadlineStatus: CheckTaskDeadlineStatus = (tasks, id) => {
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
