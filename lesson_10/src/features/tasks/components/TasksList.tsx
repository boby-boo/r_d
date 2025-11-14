import { PRIORITY, STATUS } from "../../../shared/constants";
import { deleteTask } from "../api";
import type { Task } from "../../../shared/types";
import { formatDate } from "../../../shared/utils/formatDate/index";
import { useNavigate } from "react-router-dom";

type TasksListProps = {
  tasks: Task[];
  isLoading: boolean;
  onDeleteTask: () => {};
  error: string | null;
};

const TasksList = ({ tasks, onDeleteTask, isLoading, error }: TasksListProps) => {
  const navigate = useNavigate();

    const handleDelete = async (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        await deleteTask(id);
        onDeleteTask();
    }

    const handleEditTask = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      navigate(`/tasks/${id}/edit/`);
    };

    if (isLoading) {
      return <div className="loader-wrapper"><div className="loader"></div><span style={{ marginLeft: '8px' }}>Loading tasks...</span></div>;
    }

    if (error) {
      return <div className="error-text">{error}</div>;
    }
    
    if (tasks.length === 0) {
      return <div className="empty-state">No tasks found.</div>;
    }

  return (
    <ul className="tasks-list" role="list">
      {tasks.map(task => {
        const { id, title, description, createdAt, status, priority, deadline } = task;
        return (
            <li key={id} className="task" onClick={() => navigate(`/task/${id}`)}>
                <h2 className="task-title">{title}</h2>
                <div className="task-description">{description}</div>
                <div className="task-info">
                <div className="task-created-at">Created at: <span>{formatDate(createdAt)}</span></div>
                <div className="task-status">Status: <span className={`status-${status}`}>{STATUS[status]}</span></div>
                <div className="task-priority">Priority: <span className={`priority-${priority}`}>{PRIORITY[priority]}</span></div>
                <div className="task-deadline">Deadline: <span>{formatDate(deadline)}</span></div>
                </div>
                <div className="task-actions">
                <button className="task-action btn-secondary" data-action="edit" onClick={(e) => handleEditTask(id, e)}>Edit</button>
                <button className="task-action btn-delete" data-action="delete" onClick={(e) => handleDelete(id, e)}>Delete</button>
                </div>
            </li>
        )
      })}
    </ul>
  )
}

export default TasksList;