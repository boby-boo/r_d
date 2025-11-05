import { useEffect, useState } from 'react';
import { getTasks } from '../api';
import TasksList from '../components/TasksList';
import type { Task } from '../types';

const TaskListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getTasks()
      .then(setTasks)
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div>
      <TasksList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default TaskListPage;
