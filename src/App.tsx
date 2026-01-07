import {Container, Typography, Box} from "@mui/material";
import {Provider} from "react-redux";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {store} from "./store/store";
import AddTaskForm from "./components/AddTaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{py: 4}}>
          <Box sx={{mb: 4, textAlign: "center"}}>
            <Typography variant="h3" component="h1" gutterBottom>
              Task Manager
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Organize your tasks efficiently
            </Typography>
          </Box>
          <AddTaskForm />
          <TaskFilter />
          <TaskList />
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
