import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../api';
import { PRIORITY, STATUS } from '../../../shared/constants';
import type { Task } from '../../../shared/types';
import { Trash, Pencil, Clock8 } from 'lucide-react';
import { formatDate } from '../../../shared/utils/formatDate';
import { useFilters } from '../../../context/FiltersContext';

type TaskItemProps = {
  task: Task;
  onDeleteTask: () => void;
};

const TaskItem = ({ task, onDeleteTask }: TaskItemProps) => {
  const navigate = useNavigate();
  const { handleFilterChange } = useFilters();
  const { id, title, createdAt, status, priority, deadline } = task;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const handleDelete = async (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await deleteTask(id);
    onDeleteTask();
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="task"
      {...attributes}
      {...listeners}
      onClick={() => !isDragging && navigate(`/task/${id}`)}
    >
      <div className="task-header">
        <div className="task-info-badges">
          <div className="task-status">
            {status && (
              <span
                className={`status-${status}`}
                onClick={(e) => handleFilterChange(e, 'status', status)}
              >
                {STATUS[status]}
              </span>
            )}
          </div>
          <div className="task-priority">
            {priority && (
              <span
                className={`priority-${priority}`}
                onClick={(e) => handleFilterChange(e, 'priority', priority)}
              >
                {PRIORITY[priority]}
              </span>
            )}
          </div>
        </div>
        <div className="task-info-actions">
          <button
            className="button-icon"
            data-action="edit"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              navigate(`/tasks/${id}/edit`);
            }}
          >
            <Pencil color="var(--accent-primary)" size={13} />
          </button>
          <button
            className="button-icon"
            data-action="delete"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleDelete(id, e);
            }}
          >
            <Trash color="var(--priority-high)" size={13} />
          </button>
        </div>
      </div>
      <div className="task-body">
        <h2 className="task-title">{title}</h2>
        <div className="task-info">
          <Clock8 size={15} />{' '}
          <span>
            {formatDate(createdAt)} – {formatDate(deadline)}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
