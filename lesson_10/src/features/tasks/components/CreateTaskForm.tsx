import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationTaskSchema, type Task } from "../../../shared/types";
import { getTaskById, postTask, updateTask } from "../api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskStatus, TaskPriority} from "../../../shared/types"

type FormData = z.infer<typeof ValidationTaskSchema>;

type IdParams = { 
  id: string | undefined;
}

const CreateTaskForm = () => {
  const {id} = useParams<IdParams>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      getTaskById(id).then(task => {
        setTask(task);
      });
    } else {
      reset({
        title: '',
        description: '',
        status: TaskStatus.TODO,
        priority: TaskPriority.LOW,
        deadline: new Date().toISOString().split('T')[0],
      }, { keepErrors: false, keepDirty: false, keepTouched: false });
    }
  }, [id]);

  const {register, handleSubmit, formState: {errors, isValid}, reset, trigger } = useForm<FormData>({
    resolver: zodResolver(ValidationTaskSchema),
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'low',
      deadline: new Date().toISOString().split('T')[0],
    },
  })

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: new Date(task.deadline).toISOString().split('T')[0],
      });

      trigger("deadline");
    }
  }, [task, reset, trigger]);

  const onSubmit = async (data: FormData) => {
    if (task) {
      await handleUpdateTask(task.id, data);
    } else {
      await handleAddTask(data);
    }
    navigate('/');
    onReset();
  }

  const handleUpdateTask = async (id: string, data: FormData) => {
    const oldTask = await getTaskById(id);
    await updateTask(id, {
      ...oldTask,
      ...data,
    });
  }

  const handleAddTask = async (data: FormData) => {
    const taskData = {
      ...data,
      createdAt: new Date(),
    };

    await postTask(taskData);
  }

  const onReset = () => {
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
      <button data-action="submit-button" className="btn-primary" disabled={!isValid}> {task ? 'Update Task' : 'Add Task'}</button>
      <button type="button" data-action="reset-button" className="btn-secondary" onClick={onReset}>Reset Form</button>
    </form>
  )
};

export default CreateTaskForm;