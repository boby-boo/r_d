import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationTaskSchema, type Task } from "../types";
import { postTask, updateTask } from "../services";
import { useEffect } from "react";
import { TaskStatus, TaskPriority} from "../types"

type FormData = z.infer<typeof ValidationTaskSchema>;

type CreateTaskFormProps = {
  onAddTask: (tasks: Task[]) => void;
  taskToEdit?: Task | null;
  onEditTask: (id: string | null) => void;
  onUpdateTask: (task: Task) => void;
}

const CreateTaskForm = ({ onAddTask, taskToEdit, onEditTask, onUpdateTask}: CreateTaskFormProps) => {
  const {register, handleSubmit, formState: {errors, isValid}, reset, trigger } = useForm<FormData>({
    resolver: zodResolver(ValidationTaskSchema),
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
      status: TaskStatus.TODO,
      priority: TaskPriority.LOW,
      deadline: new Date().toISOString().split('T')[0],
    },
  })

  useEffect(() => {
    if (taskToEdit) {
      reset({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        priority: taskToEdit.priority,
        deadline: new Date(taskToEdit.deadline).toISOString().split('T')[0],
      }, { keepErrors: false, keepDirty: false, keepTouched: false });

      trigger("deadline");
    }
  }, [taskToEdit, reset]);

  const onSubmit = async (data: FormData) => {
    if (taskToEdit) {
      await handleUpdateTask(taskToEdit.id, data);
    } else {
      await handleAddTask(data);
    }
    onReset();
  }

  const handleUpdateTask = async (id: string, data: FormData) => {
    const updatedTask = await updateTask(id, {
      ...taskToEdit,
      ...data,
    });

    onUpdateTask(updatedTask);
  }

  const handleAddTask = async (data: FormData) => {
    const taskData = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    const newTask = await postTask(taskData);
    onAddTask([newTask]);
  }

  const onReset = () => {
    onEditTask(null);

      reset({
        title: '',
        description: '',
        status: 'todo',
        priority: 'low',
        deadline: new Date().toISOString().split('T')[0],
    }, 
  {keepErrors: false, keepDirty: false, keepTouched: false, keepValues: false, keepDefaultValues: false});
  }

  return (
    <form id="task-form" className="task-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field">
        <label className="title" htmlFor="title">Title</label>
        <input className={`title ${errors.title ? 'error' : ''}`} id="title" {...register('title')} />
        {errors.title && <p className="error-text">{errors.title.message}</p>}
      </div>
      <div className="input-field">
        <label className="description" htmlFor="description">Description</label>
          <textarea className={`description ${errors.description ? 'error' : ''}`} id="description" {...register('description')}></textarea>
        {errors.description && <p className="error-text">{errors.description.message}</p>}
      </div>
      <div className="input-field">
        <label className="status" htmlFor="status">Status</label>
        <select className={`status ${errors.status ? 'error' : ''}`} id="status" {...register('status')}>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="input-field">
        <label className="priority" htmlFor="priority">Priority</label>
        <select className={`priority ${errors.priority ? 'error' : ''}`} id="priority" {...register('priority')}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="input-field">
        <label className="deadline" htmlFor="deadline">Deadline</label>
        <input type="date" id="deadline" className={`deadline ${errors.deadline ? 'error' : ''}`} {...register('deadline')} />
        {errors.deadline && <p className="error-text">{errors.deadline.message}</p>}
      </div>
      <button  data-action="submit-button" className="btn-primary" disabled={!isValid}> {taskToEdit ? 'Update Task' : 'Add Task'}</button>
      <button type="button" data-action="reset-button" className="btn-secondary" onClick={onReset}>Reset Form</button>
    </form>
  )
};

export default CreateTaskForm;