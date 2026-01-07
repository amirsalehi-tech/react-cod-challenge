import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {Box, Paper, Typography} from "@mui/material";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {moveTask, reorderTasks} from "../store/taskSlice";
import TaskItem from "./TaskItem";
import type {Task, TaskStatus} from "../types/task";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  title: string;
  color: string;
}

const Column = ({status, tasks, title, color}: ColumnProps) => {
  const {setNodeRef, isOver} = useDroppable({
    id: status,
  });

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 300,
        mx: 1,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 2,
          backgroundColor: color,
          mb: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </Typography>
      </Paper>
      <Box
        ref={setNodeRef}
        sx={{
          minHeight: 400,
          p: 1,
          backgroundColor: isOver ? "action.hover" : "grey.50",
          borderRadius: 1,
          border: "2px dashed",
          borderColor: isOver ? "primary.main" : "grey.300",
          borderWidth: isOver ? 2 : 1,
          transition: "all 0.2s",
        }}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 200,
                color: "text.secondary",
              }}
            >
              <Typography variant="body2">Drop tasks here</Typography>
            </Box>
          ) : (
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </SortableContext>
      </Box>
    </Box>
  );
};

const KanbanBoard = () => {
  const dispatch = useAppDispatch();
  const {tasks, filter} = useAppSelector((state) => state.tasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const statusColumns: Array<{
    status: TaskStatus;
    title: string;
    color: string;
  }> = [
    {status: "todo", title: "To Do", color: "#e3f2fd"},
    {status: "in-progress", title: "In Progress", color: "#fff3e0"},
    {status: "done", title: "Done", color: "#e8f5e9"},
  ];

  const filteredColumns =
    filter === "all"
      ? statusColumns
      : statusColumns.filter((col) => col.status === filter);

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks
      .filter((task) => task.status === status)
      .sort((a, b) => a.order - b.order);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overStatus = statusColumns.find(
      (col) => col.status === over.id
    )?.status;
    if (overStatus) {
      const tasksInStatus = getTasksByStatus(overStatus);
      dispatch(
        moveTask({
          taskId: active.id as string,
          newStatus: overStatus,
          newOrder: tasksInStatus.length,
        })
      );
      return;
    }

    const overTask = tasks.find((t) => t.id === over.id);
    if (overTask) {
      if (activeTask.status === overTask.status) {
        dispatch(
          reorderTasks({
            activeId: active.id as string,
            overId: over.id as string,
          })
        );
      } else {
        const tasksInNewStatus = getTasksByStatus(overTask.status);
        const overIndex = tasksInNewStatus.findIndex((t) => t.id === over.id);
        dispatch(
          moveTask({
            taskId: active.id as string,
            newStatus: overTask.status,
            newOrder: overIndex >= 0 ? overIndex : tasksInNewStatus.length,
          })
        );
      }
    }
  };

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 2,
        }}
      >
        {filteredColumns.map((column) => (
          <Column
            key={column.status}
            status={column.status}
            tasks={getTasksByStatus(column.status)}
            title={column.title}
            color={column.color}
          />
        ))}
      </Box>
      <DragOverlay>
        {activeTask ? (
          <Box
            sx={{
              opacity: 0.8,
              transform: "rotate(5deg)",
            }}
          >
            <TaskItem task={activeTask} />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
