import tasks from '../tasks.json';
import { TaskPriority, TaskStatus } from './constants';
import { updateTask, findTaskById, filterTaskByStatus, getDetailsById, deleteTask, createTask, checkTaskDeadlineStatus } from './services/tasks';
import { validateAndNormalizeTasks } from './utils/validate';

const { valid: validatedTasks } = validateAndNormalizeTasks(tasks);

updateTask(validatedTasks, 1, 'status', TaskStatus.DONE);

createTask({
    title: 'NEW TEST TAK',
    description: 'Just created',
    deadline: new Date().toISOString(),
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH
}, validatedTasks);

findTaskById(8, validatedTasks);

checkTaskDeadlineStatus(validatedTasks, 1);
checkTaskDeadlineStatus(validatedTasks, 4);

filterTaskByStatus(TaskStatus.DONE, validatedTasks);
getDetailsById(1, validatedTasks);
getDetailsById(21, validatedTasks);

deleteTask(1, validatedTasks);
deleteTask(21, validatedTasks);