import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Task } from '../../../shared/types';
import { getTaskById, deleteTask } from '../api';
import { formatDate } from '../../../shared/utils/formatDate/index';
import { PRIORITY, STATUS } from '../../../shared/constants';

type IdParams = {
  id: string;
};

const TaskDetailsPage = () => {
  const { id } = useParams<IdParams>();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getTaskById(id)
        .then(setTask)
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/tasks/${id}/edit/`);
  };

  const handleDelete = () => {
    if (id && window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      navigate('/');
    }
  };

  if (isLoading) {
    return <div className="loader">Loading task details...</div>;
  }

  if (!task) {
    return (
      <div className="task-not-found">
        <h2>Task Not Found</h2>
        <p>We couldn't find the task you're looking for.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          &larr; Back to List
        </button>
      </div>
    );
  }

  const { title, description, createdAt, status, priority, deadline } = task;

  return (
    <section className="task-details-page">
      <div className="task-details-header">
        <h1 className="task-title">{title}</h1>
        <button onClick={() => navigate('/')} className="btn-secondary btn-back">
          &larr; Back to List
        </button>
      </div>

      <p className="task-details-description">{description || <i>No description provided.</i>}</p>

      <div className="task-info">
        <div className="task-status">
          Status: <span className={`status-${status}`}>{STATUS[status!]}</span>
        </div>
        <div className="task-priority">
          Priority: <span className={`priority-${priority}`}>{PRIORITY[priority!]}</span>
        </div>
        <div className="task-created-at">
          Created at: <span>{formatDate(createdAt)}</span>
        </div>
        <div className="task-deadline">
          Deadline: <span>{formatDate(deadline)}</span>
        </div>
      </div>

      <div className="task-actions">
        <button className="task-action btn-secondary" data-action="edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="task-action btn-delete" data-action="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </section>
  );
};

export default TaskDetailsPage;
