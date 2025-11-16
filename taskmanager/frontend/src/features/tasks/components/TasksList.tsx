import type { Task } from '../../../shared/types';
import { useDroppable } from '@dnd-kit/core';
import TaskItem from './TaskItem';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

type TasksListProps = {
  tasks: Task[];
  id: string;
  label: string;
  onDeleteTask: () => void;
};

const TasksList = ({ label, id, tasks, onDeleteTask }: TasksListProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className="tasks-column"
      ref={setNodeRef}
      data-over={isOver}
      style={{ backgroundColor: isOver ? 'rgba(108,93,211,0.08)' : 'inherit' }}
    >
      <h2 className="tasks-column-title">{label}</h2>

      <SortableContext items={tasks.map((t: Task) => t.id)} strategy={verticalListSortingStrategy}>
        <ul className="tasks-list">
          {tasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
};
export default TasksList;
