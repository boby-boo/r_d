import { PRIORITY, STATUS } from "../constants";
import { deleteTask } from "../services";
import type { Task } from "../types";
import { formatDate } from "../utils/formatDate";

type TasksListProps = {
    tasks: Task[];
    onDeleteTask: (id: string) => void;
    onEditTask: (id: string) => void;
};

const TasksList = ({ tasks, onDeleteTask, onEditTask }: TasksListProps) => {
    const handleDelete = (id: string) => {
        deleteTask(id);
        onDeleteTask(id);
    }
    
  return (
    <ul className="tasks-list">
      {tasks.map(task => {
        const { id, title, description, createdAt, status, priority, deadline } = task;
        return (
            <li key={id}>
                <h2 className="task-title">{title}</h2>
                <div className="task-description">{description}</div>
                <div className="task-info">
                <div className="task-created-at">Created at: <span>{formatDate(createdAt)}</span></div>
                <div className="task-status">Status: <span className={`status-${status}`}>{STATUS[status!]}</span></div>
                <div className="task-priority">Priority: <span className={`priority-${priority}`}>{PRIORITY[priority!]}</span></div>
                <div className="task-deadline">Deadline: <span>{formatDate(deadline)}</span></div>
                </div>
                <div className="task-actions">
                <button className="task-action btn-secondary" data-action="edit" onClick={() => onEditTask(id)}>Edit</button>
                <button className="task-action btn-delete" data-action="delete" onClick={() => handleDelete(id)}>Delete</button>
                </div>
            </li>
        )
      })}
    </ul>
  )
}

export default TasksList;