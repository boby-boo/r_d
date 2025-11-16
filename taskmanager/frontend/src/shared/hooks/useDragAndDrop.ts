import { useSensor, useSensors, MouseSensor, TouchSensor, type DragOverEvent, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { updateTask } from "../../features/tasks/api";
import { TaskStatus, type Task } from "../types";

export default function useDragAndDrop(
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  initialTasksRef: React.MutableRefObject<Task[]>
) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const getColumns = () => [
    { id: TaskStatus.TODO, cards: tasks.filter((t) => t.status === TaskStatus.TODO) },
    { id: TaskStatus.IN_PROGRESS, cards: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS) },
    { id: TaskStatus.REVIEW, cards: tasks.filter((t) => t.status === TaskStatus.REVIEW) },
    { id: TaskStatus.DONE, cards: tasks.filter((t) => t.status === TaskStatus.DONE) },
  ];

  const findColumn = (id: string | null) => {
    if (!id) return null;
    const columns = getColumns();
    if (columns.some((c) => c.id === id)) return columns.find((c) => c.id === id) ?? null;

    const cardMap = columns.flatMap((col) =>
      col.cards.map((card) => ({ cardId: card.id, columnId: col.id }))
    );
    const columnId = cardMap.find((i) => i.cardId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setTasks((prev) => {
      const activeTasks = activeColumn.cards;

      const activeIndex = activeTasks.findIndex((i) => i.id === activeId);

      const movedTask = activeTasks[activeIndex];
      return prev.map((t) =>
        t.id === movedTask.id ? { ...t, status: overColumn.id as Task["status"] } : t
      );
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn) return;

    const initialStatus = initialTasksRef.current.find((t) => t.id === activeId)?.status;
    const newStatus = overColumn.id as Task["status"];

    if (initialStatus !== newStatus) {
      try {
        await updateTask(activeId, { status: newStatus });
        initialTasksRef.current = tasks.map((t) =>
          t.id === activeId ? { ...t, status: newStatus } : t
        );
      } catch (err) {
        console.error("Failed to update task status:", err);
      }
    }

    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);

    if (activeIndex !== overIndex) {
      const reordered = arrayMove(activeColumn.cards, activeIndex, overIndex);
      setTasks((prev) => {
        const updated = prev.filter((t) => t.status !== activeColumn.id);
        return [...updated, ...reordered];
      });
    }
  };

  return { sensors, handleDragOver, handleDragEnd, getColumns };
}
