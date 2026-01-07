import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter } from '../store/taskSlice';
import type { FilterStatus } from '../types/task';

const TaskFilter = () => {
  const dispatch = useAppDispatch();
  const { filter, tasks } = useAppSelector((state) => state.tasks);

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: FilterStatus | null
  ) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter Tasks
      </Typography>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label="task filter"
        fullWidth
      >
        <ToggleButton value="all" aria-label="all tasks">
          All ({tasks.length})
        </ToggleButton>
        <ToggleButton value="active" aria-label="active tasks">
          Active ({activeCount})
        </ToggleButton>
        <ToggleButton value="completed" aria-label="completed tasks">
          Completed ({completedCount})
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default TaskFilter;
