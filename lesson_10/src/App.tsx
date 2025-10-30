import TasksListPage from './features/tasks/pages/TaskListPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './features/tasks/pages/NotFoundPage';
import CreateTaskPage from './features/tasks/pages/CreateTaskPage';
import TaskDetailsPage from './features/tasks/pages/TaskDetailsPage';
import Layout from './features/tasks/components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TasksListPage />,
      },
      {
        path: 'tasks/create',
        element: <CreateTaskPage />,
      },
      {
        path: 'tasks/:id/edit/',
        element: <CreateTaskPage />,
      },
      {
        path: 'task/:id',
        element: <TaskDetailsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  }
]);


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
