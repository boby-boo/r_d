import type { Task } from "../../../features/tasks/types";
import { formatDate } from "../formatDate";
import { STATUS, PRIORITY } from "../../constants";


export const renderTasks = (tasks: Task[]) => {
  const tasksContainer = document.querySelector<HTMLDivElement>('.tasks-list')!;
  tasksContainer.innerHTML = '';
  tasks.forEach(task => {
    const { id, title, description, createdAt, status, priority, deadline } = task;
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.dataset.id = id;

    taskItem.innerHTML = `
        <h2 class="task-title">${title}</h2>
        <div class="task-description">${description}</div>
        <div class="task-info">
          <div class="task-created-at">Created at: <span>${formatDate(createdAt)}</span></div>
          <div class="task-status">Status: <span class="status-${status}">${STATUS[status!]}</span></div>
          <div class="task-priority">Priority: <span class="priority-${priority}">${PRIORITY[priority!]}</span></div>
          <div class="task-deadline">Deadline: <span>${formatDate(deadline)}</span></div>
        </div>
        <div class="task-actions">
          <button class="task-action btn-secondary" data-action="edit">Edit</button>
          <button class="task-action btn-delete" data-action="delete">Delete</button>
        </div>
      `;
    tasksContainer.appendChild(taskItem);
  });
}