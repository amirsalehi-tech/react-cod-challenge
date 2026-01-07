import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Paper,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { DragIndicator, Delete } from '@mui/icons-material';
import { useAppDispatch } from '../store/hooks';
import { deleteTask } from '../store/taskSlice';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isDone = task.status === 'done';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      elevation={isDragging ? 8 : 2}
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        backgroundColor: isDone ? 'action.selected' : 'background.paper',
        textDecoration: isDone ? 'line-through' : 'none',
        cursor: 'grab',
        userSelect: 'none',
        '&:hover': {
          elevation: 4,
          transform: 'translateY(-2px)',
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'text.secondary',
        }}
      >
        <DragIndicator />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            textDecoration: isDone ? 'line-through' : 'none',
            color: isDone ? 'text.secondary' : 'text.primary',
            fontWeight: task.status === 'in-progress' ? 'bold' : 'normal',
            pointerEvents: 'none',
          }}
        >
          {task.title}
        </Typography>
        {task.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              textDecoration: isDone ? 'line-through' : 'none',
              pointerEvents: 'none',
            }}
          >
            {task.description}
          </Typography>
        )}
      </Box>
      <IconButton
        onClick={handleDelete}
        size="small"
        color="error"
        sx={{
          opacity: 0.7,
          '&:hover': {
            opacity: 1,
            backgroundColor: 'error.light',
          },
        }}
        aria-label="delete task"
      >
        <Delete fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default TaskItem;
