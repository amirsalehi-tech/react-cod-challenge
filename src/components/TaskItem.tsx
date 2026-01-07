import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Paper,
  Checkbox,
  Typography,
  Box,
} from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
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

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        backgroundColor: task.completed ? 'action.selected' : 'background.paper',
        textDecoration: task.completed ? 'line-through' : 'none',
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <Box
        {...attributes}
        {...listeners}
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'text.secondary',
          cursor: 'grab',
          '&:active': {
            cursor: 'grabbing',
          },
        }}
      >
        <DragIndicator />
      </Box>
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        sx={{ mt: -0.5 }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'text.secondary' : 'text.primary',
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
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {task.description}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default TaskItem;
