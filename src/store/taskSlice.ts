import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, FilterStatus } from '../types/task';

interface TaskState {
  tasks: Task[];
  filter: FilterStatus;
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        order: state.tasks.length,
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    reorderTasks: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;
      const activeIndex = state.tasks.findIndex((t) => t.id === activeId);
      const overIndex = state.tasks.findIndex((t) => t.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        const [removed] = state.tasks.splice(activeIndex, 1);
        state.tasks.splice(overIndex, 0, removed);
        // Update order values
        state.tasks.forEach((task, index) => {
          task.order = index;
        });
      }
    },
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, reorderTasks, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
