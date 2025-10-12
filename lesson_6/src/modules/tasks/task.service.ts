import { AnyTask, Status, TaskId } from "./task.types";

export class TaskService {
    private tasks: AnyTask[] = [];

    public createTask(task: AnyTask): AnyTask {
        this.tasks.push(task);
        console.log(`Task "${task.title}" [${task.constructor.name}] created successfully.`);
        return task;
    }

    public getTaskById(id: TaskId): AnyTask | undefined {
        return this.tasks.find(task => task.id === id);
    }

    public getAllTasks(): AnyTask[] {
        return [...this.tasks];
    }

    public updateTask(id: TaskId, updates: Partial<AnyTask>): AnyTask | undefined {
        const task = this.getTaskById(id);
        if (!task) {
            console.error(`Error: Task with ID "${id}" not found.`);
            return undefined;
        }

        if (updates.title !== undefined && updates.title.trim() === '') {
            throw new Error('Title cannot be empty.');
        }

        Object.assign(task, updates);
        console.log(`Task "${task.title}" updated successfully.`);
        return task;
    }

    public deleteTask(id: TaskId): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            console.error(`Error: Task with ID "${id}" not found.`);
            return false;
        }
        const deletedTask = this.tasks.splice(taskIndex, 1);
        console.log(`Task "${deletedTask[0]?.title}" deleted successfully.`);
        return true;
    }

    public filterTasksByStatus(status: Status): AnyTask[] {
        return this.tasks.filter(task => task.status === status);
    }
}