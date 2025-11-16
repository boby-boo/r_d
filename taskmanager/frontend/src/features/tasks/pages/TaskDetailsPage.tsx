import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Task } from '../../../shared/types';
import { getTaskById, deleteTask } from '../api';
import { formatDate } from '../../../shared/utils/formatDate/index';
import { PRIORITY, STATUS } from '../../../shared/constants';
import Loader from '../../../shared/components/Loader';
import { useFilters } from '../../../context/FiltersContext';

type IdParams = {
  id: string;
};

const TaskDetailsPage = () => {
  const { id } = useParams<IdParams>();
  const { handleFilterChange } = useFilters();
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
    return <Loader />;
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

  const handleFilterClick = (e: React.MouseEvent, type: 'status' | 'priority', value: string) => {
    e.stopPropagation();
    handleFilterChange(e, type, value);
    navigate(`/`);
  };

  const { title, description, createdAt, status, priority, deadline } = task;

  return (
    <section className="task-details-container">
      <div className="task-details-top">
        <h1 className="task-details-title">{title}</h1>
        <button onClick={() => navigate('/')} className="task-details-back">
          &larr; Back to List
        </button>
      </div>

      <p className="task-details-desc">{description || <i>No description provided.</i>}</p>

      <div className="task-details-info">
        <div className="task-details-info-item">
          <span className="task-details-info-label">Status</span>
          <span
            className={`task-details-info-value status-${status}`}
            onClick={(e) => handleFilterClick(e, 'status', status!)}
          >
            {STATUS[status!]}
          </span>
        </div>

        <div className="task-details-info-item">
          <span className="task-details-info-label">Priority</span>
          <span
            className={`task-details-info-value priority-${priority}`}
            onClick={(e) => handleFilterClick(e, 'priority', priority!)}
          >
            {PRIORITY[priority!]}
          </span>
        </div>

        <div className="task-details-info-item">
          <span className="task-details-info-label">Created at</span>
          <span className="task-details-info-value">{formatDate(createdAt)}</span>
        </div>

        <div className="task-details-info-item">
          <span className="task-details-info-label">Deadline</span>
          <span className="task-details-info-value">{formatDate(deadline)}</span>
        </div>
      </div>

      <div className="task-details-actions">
        <button className="task-details-btn edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="task-details-btn delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </section>
  );
};

export default TaskDetailsPage;
