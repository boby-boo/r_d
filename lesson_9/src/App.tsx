import CreateTaskForm from './components/CreateTaskForm';
import type { Task } from './types';
import { getTasks } from './services';
import { useEffect, useState } from 'react';
import TasksList from './components/TasksList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleEditTask = (id: string | null) => {
    const task = tasks.find(t => t.id === id);
    if (task) setTaskToEdit(task);
  };

  const handleUpdateTask = async () => {
    await fetchTasks();
    setTaskToEdit(null);
  };

  return (
      <div className="container">
        <div className="tasks-container">
          <TasksList 
            tasks={tasks} 
            onDeleteTask={fetchTasks} 
            onEditTask={handleEditTask}
          />
          <CreateTaskForm 
            onAddTask={fetchTasks} 
            taskToEdit={taskToEdit} 
            onEditTask={handleEditTask} 
            onUpdateTask={handleUpdateTask}
          />
        </div>
      </div>
  )
}

export default App
