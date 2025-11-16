import { useEffect, useState, useRef } from 'react';
import { getTasks } from '../api';
import TasksList from '../components/TasksList';
import type { Task } from '../../../shared/types';
import { DndContext, closestCorners } from '@dnd-kit/core';
import Loader from '../../../shared/components/Loader';
import useDragAndDrop from '../../../shared/hooks/useDragAndDrop';
import { STATUS } from '../../../shared/constants';
import { useFilters } from '../../../context/FiltersContext';

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const initialTasksRef = useRef<Task[]>([]);
  const { sensors, handleDragOver, handleDragEnd, getColumns } = useDragAndDrop(
    tasks,
    setTasks,
    initialTasksRef
  );
  const { filters } = useFilters();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getTasks(filters);
      setTasks(res);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const columns = getColumns();

  const isEmpty = tasks.length === 0 && !isLoading;

  return (
    <div className="task-list-page">
      {isLoading && <Loader />}
      {error && <div className="error-text">{error}</div>}
      {isEmpty && <Loader message="No tasks found" />}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="tasks-board">
          {columns.map((col) => (
            <TasksList
              key={col.id}
              id={col.id}
              label={STATUS[col.id]}
              tasks={col.cards}
              onDeleteTask={fetchTasks}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
