import {ToggleButton, ToggleButtonGroup, Box, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setFilter} from "../store/taskSlice";
import type {FilterStatus} from "../types/task";

const StatusFilter = () => {
  const dispatch = useAppDispatch();
  const {filter, tasks} = useAppSelector((state) => state.tasks);

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: FilterStatus | null
  ) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
    }
  };

  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "in-progress"
  ).length;
  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <Box sx={{mb: 3}}>
      <Typography variant="h6" gutterBottom>
        Filter by Status
      </Typography>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label="status filter"
        fullWidth
      >
        <ToggleButton value="all" aria-label="all tasks">
          All ({tasks.length})
        </ToggleButton>
        <ToggleButton value="todo" aria-label="todo tasks">
          To Do ({todoCount})
        </ToggleButton>
        <ToggleButton value="in-progress" aria-label="in progress tasks">
          In Progress ({inProgressCount})
        </ToggleButton>
        <ToggleButton value="done" aria-label="done tasks">
          Done ({doneCount})
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default StatusFilter;
