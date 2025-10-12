import { TaskService } from "./task.service";
import { AnyTask, Status, TaskId } from "./task.types";

export class TaskController {
    constructor(private taskService: TaskService) {}

    public create(task: AnyTask): AnyTask {
        return this.taskService.createTask(task);
    }
    
    public getById(id: TaskId): void {
        const task = this.taskService.getTaskById(id);
        if (task) {
            console.log("Task Details");
            console.log(task.getTaskInfo());
        } else {
            console.log(`Task with ID "${id}" was not found.`);
        }
    }

    public getAll(): void {
        const allTasks = this.taskService.getAllTasks();
        console.log("All Tasks");
        allTasks.forEach(task => console.log(`[${task.id}] ${task.title} (${task.constructor.name})`));
    }

    public update(id: TaskId, updates: Partial<AnyTask>): void {
        this.taskService.updateTask(id, updates);
    }

    public delete(id: TaskId): void {
        this.taskService.deleteTask(id);
    }

    public filterByStatus(status: Status): void {
        const filtered = this.taskService.filterTasksByStatus(status);
        console.log(`Tasks with status: ${status}`);
        filtered.forEach(task => console.log(`- ${task.title}`));
    }
}