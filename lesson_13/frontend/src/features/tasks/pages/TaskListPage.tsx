import { useEffect, useState } from 'react';
import { getTasks } from '../api';
import TasksList from '../components/TasksList';
import type { Task } from '../types';

const TaskListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getTasks();
      setTasks(res);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <TasksList tasks={tasks} onDeleteTask={fetchTasks} isLoading={isLoading} error={error} />
    </div>
  );
};

export default TaskListPage;
