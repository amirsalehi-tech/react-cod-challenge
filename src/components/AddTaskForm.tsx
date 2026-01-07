import {useState} from "react";
import {Box, TextField, Button, Paper, Typography} from "@mui/material";
import {useAppDispatch} from "../store/hooks";
import {addTask} from "../store/taskSlice";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({title: title.trim(), description: description.trim()}));
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Paper elevation={3} sx={{p: 3, mb: 3}}>
      <Typography variant="h5" component="h2" gutterBottom>
        Add New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          variant="outlined"
          multiline
          rows={3}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{mt: 2}}
          disabled={!title.trim()}
        >
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default AddTaskForm;
