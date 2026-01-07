import {Container, Typography, Box} from "@mui/material";
import {Provider} from "react-redux";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {store} from "./store/store";
import AddTaskForm from "./components/AddTaskForm";
import StatusFilter from "./components/StatusFilter";
import KanbanBoard from "./components/KanbanBoard";

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
        <Container maxWidth="xl" sx={{py: 4}}>
          <Box sx={{mb: 4, textAlign: "center"}}>
            <Typography variant="h3" component="h1" gutterBottom>
              Task Manager
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Drag and drop tasks between columns to organize your work
            </Typography>
          </Box>
          <AddTaskForm />
          <StatusFilter />
          <KanbanBoard />
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
