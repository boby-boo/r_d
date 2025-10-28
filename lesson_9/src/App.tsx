import CreateTaskForm from './components/CreateTaskForm';
import type { Task } from './types';
import { getTasks } from './services';
import { useEffect, useState } from 'react';
import TasksList from './components/TasksList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    getTasks().then(tasks => {
      setTasks(tasks);
    });

  }, [])

  const handleAddTask = (newTasks: Task[]) => {
    setTasks(prev => [...prev, ...newTasks]);
  }

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  const handleEditTask = (id: string | null) => {
    const task = tasks.find(t => t.id === id);

    if (task) {
      setTaskToEdit(task);
    } else {
      setTaskToEdit(null);
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    setTaskToEdit(null);
  };

  return (
    <>
      <div className="container">
        <div className="tasks-container">
          <TasksList 
            tasks={tasks} 
            onDeleteTask={handleDeleteTask} 
            onEditTask={handleEditTask}
          />
          <CreateTaskForm 
            onAddTask={handleAddTask} 
            taskToEdit={taskToEdit} 
            onEditTask={handleEditTask} 
            onUpdateTask={handleUpdateTask}
          />
        </div>
      </div>
    </>
  )
}

export default App
