import type { Task } from "../../../features/tasks/types";

export const defineValueToForm = (form: HTMLFormElement, task: Task) => {
  Object.keys(task).forEach((key) => {
    const value = task[key as keyof Task];
    const element = form.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`#${key}`);
    if (element) {
      element.value = key === 'deadline' ? new Date(value as Date).toISOString().split('T')[0]! : value as string ?? '';
    }
  });
}