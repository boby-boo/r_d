import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "../../../shared/types";
import { getTaskById } from "../api";
import { formatDate } from "../../../shared/utils/formatDate/index";
import { PRIORITY, STATUS } from "../../../shared/constants";

type IdParams = {
  id: string;
}

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

  if (isLoading) {
    return <div>Loading task details...</div>;
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
    
    </section>
  )
}

export default TaskDetailsPage;