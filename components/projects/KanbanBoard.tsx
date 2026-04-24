"use client";

import { Task, Priority, Status } from "@/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import axios from "axios";
import { useState } from "react";

import { Trash2, ArrowUpDown, Flag } from "lucide-react";

/**
 * Draggable task item inside a column
 */
function DraggableTask({
  task,
  isSelected,
  onClick,
  onDelete,
}: {
  task: Task;
  onClick: () => void;
  isSelected: boolean;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  // Apply drag movement style
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  // Returns color based on priority
  const priorityColor = (priority?: Priority) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick} // select task
      className={`
        group mb-2 p-3 rounded-xl border transition-all
        flex items-center justify-between gap-3
        cursor-pointer select-none
        ${isSelected
          ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white"
          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
        }
        ${isDragging ? "opacity-50" : ""}
      `}
    >
      {/* TASK TITLE */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="cursor-grab active:cursor-grabbing text-sm font-medium truncate">
          {task.title}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2">
        {/* PRIORITY FLAG */}
        <span
          title={`Priority: ${task.priority}`}
          className="shrink-0 transition-all duration-300 
          order-2 group-hover:order-0 group-hover:-translate-x-1"
        >
          <Flag className={`w-4 h-4 ${priorityColor(task.priority)}`} />
        </span>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition order-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete Task"
            className="p-1.5 rounded-md bg-red-100 dark:bg-red-950/40 hover:bg-red-500 hover:text-white transition"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Droppable column (To Do, In Progress, Done)
 */
function DroppableColumn({
  status,
  children,
  sortOrder,
  toggleSort,
  hasTasks,
}: {
  status: Status;
  children: React.ReactNode;
  sortOrder: "newest" | "oldest";
  toggleSort: () => void;
  hasTasks: boolean;
}) {
  const { setNodeRef } = useDroppable({ id: status });

  // Column color styles per status
  const statusStyle: Record<string, string> = {
    "To Do":
      "bg-blue-50 border-blue-200 dark:bg-blue-900/40 dark:border-blue-700",
    "In Progress":
      "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/40 dark:border-yellow-700",
    Done:
      "bg-green-50 border-green-200 dark:bg-green-900/40 dark:border-green-700",
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-2xl border
        p-3 flex flex-col h-[400px]
        shadow-sm backdrop-blur-sm
        ${statusStyle[status] || "bg-zinc-100 dark:bg-zinc-900"}
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-zinc-900 dark:text-white">
          {status}
        </h2>

        {/* SORT TOGGLE */}
        {hasTasks && (
          <button
            onClick={toggleSort}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:opacity-80"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOrder === "newest" ? "Newest" : "Oldest"}
          </button>
        )}
      </div>

      {/* TASK LIST */}
      <div className="overflow-y-auto flex-1 pr-1 scrollbar-hide">
        {children}
      </div>
    </div>
  );
}

/**
 * Main Kanban board with drag-and-drop
 */
interface Props {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setDeleteItem: (item: {
    id: string;
    type: "task";
    name: string;
  }) => void;
  refreshLogs: () => void;
}

export default function KanbanBoard({
  tasks,
  selectedTask,
  setSelectedTask,
  setTasks,
  setDeleteItem,
  refreshLogs,
}: Props) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const statuses: Status[] = ["To Do", "In Progress", "Done"];

  // Drag sensor (prevents accidental drags)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Sorting per column
  const [sortOrders, setSortOrders] = useState<
    Record<Status, "newest" | "oldest">
  >({
    "To Do": "newest",
    "In Progress": "newest",
    Done: "newest",
  });

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  /**
   * Handles dropping a task into a new column
   * - Updates UI optimistically
   * - Syncs with backend
   */
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Status;

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );

    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, status: newStatus });
    }

    try {
      await axios.put(`/api/tasks/${taskId}`, {
        status: newStatus,
      });

      setTimeout(() => refreshLogs(), 100);
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  // Sort tasks based on selected order
  const sortTasks = (list: Task[], status: Status) => {
    const order = sortOrders[status];

    return [...list].sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return order === "newest" ? bTime - aTime : aTime - bTime;
    });
  };

  // Group tasks per column
  const grouped: Record<Status, Task[]> = {
    "To Do": sortTasks(
      tasks.filter((t) => t.status === "To Do"),
      "To Do"
    ),
    "In Progress": sortTasks(
      tasks.filter((t) => t.status === "In Progress"),
      "In Progress"
    ),
    Done: sortTasks(
      tasks.filter((t) => t.status === "Done"),
      "Done"
    ),
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* DRAG PREVIEW */}
      <DragOverlay>
        {activeTask && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl shadow-lg text-sm">
            {activeTask.title}
          </div>
        )}
      </DragOverlay>

      {/* BOARD GRID */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {statuses.map((status) => {
          const items = grouped[status];

          return (
            <DroppableColumn
              key={status}
              status={status}
              sortOrder={sortOrders[status]}
              toggleSort={() =>
                setSortOrders((prev) => ({
                  ...prev,
                  [status]:
                    prev[status] === "newest"
                      ? "oldest"
                      : "newest",
                }))
              }
              hasTasks={items.length > 0}
            >
              {items.map((task) => (
                <DraggableTask
                  key={task.id}
                  task={task}
                  onClick={() =>
                    setSelectedTask((prev) =>
                      prev?.id === task.id ? null : task
                    )
                  }
                  isSelected={selectedTask?.id === task.id}
                  onDelete={() =>
                    setDeleteItem({
                      id: task.id,
                      type: "task",
                      name: task.title,
                    })
                  }
                />
              ))}
            </DroppableColumn>
          );
        })}
      </div>
    </DndContext>
  );
}