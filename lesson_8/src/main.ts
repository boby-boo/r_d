import './style.css';
import type { Task } from './types';
import { deleteTask, getTaskById, getTasks, postTask, updateTask } from './services';
import { renderTasks, defineValueToForm, toggleLoader } from './utils';

window.addEventListener('DOMContentLoaded', async () => {
  const taskContainer = document.querySelector<HTMLDivElement>('.tasks-list')!;
  const form = document.querySelector<HTMLFormElement>('#task-form')!;
  const sumbitButton = document.querySelector<HTMLButtonElement>('[data-action="submit-button"]')!;

  let editingId: string | null = null;

  const loader = document.createElement('span');
  loader.classList.add('loader');

  renderTasks(await getTasks());

  taskContainer.addEventListener('click', async (e) => {
    const target = e.target as HTMLButtonElement;
    const taskItem = target.closest<HTMLLIElement>('.task-item')!;

    if (!taskItem) return;

    const id = taskItem.dataset.id!;
    const action = target.dataset.action!;

    editingId = null;

    if (action === 'delete') {
      toggleLoader(taskItem, loader, '[data-action="delete"]');
      await deleteTask(id);
      renderTasks(await getTasks());
      toggleLoader(taskItem, loader, '[data-action="delete"]');
    }
    if (action === 'edit') {
      editingId = id;
      toggleLoader(taskItem, loader, '[data-action="edit"]');

      const task = await getTaskById(id);

      defineValueToForm(form, task);
      toggleLoader(taskItem, loader, '[data-action="edit"]');
    }
    if (action === 'reset') {
      form.reset();
    }

    sumbitButton.textContent = editingId ? 'Update Task' : 'Add Task';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form)!;
    const task = Object.fromEntries(formData) as Omit<Task, 'id' | 'createdAt'>;
    toggleLoader(form, loader, '[data-action="submit-button"]');

    if (editingId) {
      const oldTask = await getTaskById(editingId);
      await updateTask(editingId, {
        ...oldTask,
        ...task,
      });
    } else {
      const createdAt = new Date().toISOString();
      const newTask: Omit<Task, 'id'> = {
        createdAt,
        ...task,
      };
      await postTask(newTask);
    }

    renderTasks(await getTasks());
    editingId = null;
    form.reset();
    sumbitButton.textContent = editingId ? 'Update Task' : 'Add Task';

  });
})