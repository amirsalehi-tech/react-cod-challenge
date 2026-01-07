import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {Box, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {reorderTasks} from "../store/taskSlice";
import TaskItem from "./TaskItem";
import type {Task} from "../types/task";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const {tasks, filter} = useAppSelector((state) => state.tasks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTasks = tasks
    .filter((task: Task) => {
      if (filter === "all") return true;
      return task.status === filter;
    })
    .sort((a, b) => a.order - b.order);

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      dispatch(
        reorderTasks({
          activeId: active.id as string,
          overId: over.id as string,
        })
      );
    }
  };

  if (filteredTasks.length === 0) {
    return (
      <Box sx={{textAlign: "center", py: 4}}>
        <Typography variant="h6" color="text.secondary">
          {filter === "all"
            ? "No tasks yet. Add one to get started!"
            : `No ${filter === "in-progress" ? "in progress" : filter} tasks.`}
        </Typography>
      </Box>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
