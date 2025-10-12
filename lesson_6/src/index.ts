import { TaskController } from "./modules/tasks/task.controller";
import { TaskService } from "./modules/tasks/task.service";
import { Bug, BugSeverity, Story, Subtask, TaskPriority, TaskStatus } from "./modules/tasks/task.types";

const taskService = new TaskService();

const taskController = new TaskController(taskService);

const newTask = taskController.create(new Story({
    title: "Study OOP",
    description: "Study OOP principles and practices.",
    deadline: new Date("2025-11-01"),
    priority: TaskPriority.HIGH,
    storyPoints: 5
}));

const bug1 = taskController.create(new Bug({
    title: "Home work is not done",
    description: "Home work is not done for the last lesson.",
    deadline: new Date("2025-10-15"),
    status: TaskStatus.IN_PROGRESS,
    severity: BugSeverity.CRITICAL
}));

const subtask1 = taskController.create(new Subtask({
    title: "Check home work",
    description: "Check home work for the last lesson.",
    deadline: new Date("2025-10-20"),
    parentTaskId: newTask.id
}));


taskController.getAll();


taskController.getById(bug1.id);

taskController.update(bug1.id, { status: TaskStatus.DONE, priority: TaskPriority.MEDIUM });
taskController.getById(bug1.id);

taskController.filterByStatus(TaskStatus.DONE);

taskController.delete(subtask1.id);
taskController.getAll();
