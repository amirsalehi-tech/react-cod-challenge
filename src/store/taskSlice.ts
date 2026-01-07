import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, FilterStatus, TaskStatus } from '../types/task';

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
        status: 'todo',
        completed: false,
        order: state.tasks.filter((t) => t.status === 'todo').length,
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        // Update status based on completed state
        if (task.completed) {
          task.status = 'done';
        } else if (task.status === 'done') {
          task.status = 'todo';
        }
      }
    },
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: TaskStatus }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        const oldStatus = task.status;
        task.status = action.payload.status;
        task.completed = action.payload.status === 'done';
        
        // Update order values for both old and new status columns
        const tasksInOldStatus = state.tasks
          .filter((t) => t.status === oldStatus)
          .sort((a, b) => a.order - b.order);
        tasksInOldStatus.forEach((t, index) => {
          t.order = index;
        });
        
        const tasksInNewStatus = state.tasks
          .filter((t) => t.status === action.payload.status)
          .sort((a, b) => a.order - b.order);
        tasksInNewStatus.forEach((t, index) => {
          t.order = index;
        });
      }
    },
    moveTask: (state, action: PayloadAction<{ taskId: string; newStatus: TaskStatus; newOrder: number }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        const oldStatus = task.status;
        const wasInSameColumn = oldStatus === action.payload.newStatus;
        
        // Update task status and completed state
        task.status = action.payload.newStatus;
        task.completed = action.payload.newStatus === 'done';
        
        if (wasInSameColumn) {
          // Moving within the same column - just reorder
          const tasksInStatus = state.tasks
            .filter((t) => t.status === action.payload.newStatus)
            .sort((a, b) => a.order - b.order);
          
          const currentIndex = tasksInStatus.findIndex((t) => t.id === action.payload.taskId);
          const newIndex = action.payload.newOrder;
          
          if (currentIndex !== newIndex) {
            // Remove from current position
            tasksInStatus.splice(currentIndex, 1);
            // Insert at new position
            tasksInStatus.splice(newIndex, 0, task);
            // Update all orders
            tasksInStatus.forEach((t, index) => {
              t.order = index;
            });
          }
        } else {
          // Moving to a different column
          // Get all tasks in the new status column (excluding the moved task)
          const tasksInNewStatus = state.tasks
            .filter((t) => t.id !== action.payload.taskId && t.status === action.payload.newStatus)
            .sort((a, b) => a.order - b.order);
          
          // Insert the task at the new position
          tasksInNewStatus.splice(action.payload.newOrder, 0, task);
          
          // Update order values for new status column
          tasksInNewStatus.forEach((t, index) => {
            t.order = index;
          });
          
          // Update order values for old status column
          const tasksInOldStatus = state.tasks
            .filter((t) => t.status === oldStatus && t.id !== action.payload.taskId)
            .sort((a, b) => a.order - b.order);
          tasksInOldStatus.forEach((t, index) => {
            t.order = index;
          });
        }
      }
    },
    reorderTasks: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;
      const activeTask = state.tasks.find((t) => t.id === activeId);
      const overTask = state.tasks.find((t) => t.id === overId);

      if (activeTask && overTask && activeTask.status === overTask.status) {
        const tasksInStatus = state.tasks
          .filter((t) => t.status === activeTask.status)
          .sort((a, b) => a.order - b.order);
        
        const activeIndex = tasksInStatus.findIndex((t) => t.id === activeId);
        const overIndex = tasksInStatus.findIndex((t) => t.id === overId);

        if (activeIndex !== -1 && overIndex !== -1) {
          const [removed] = tasksInStatus.splice(activeIndex, 1);
          tasksInStatus.splice(overIndex, 0, removed);
          
          // Update order values
          tasksInStatus.forEach((task, index) => {
            task.order = index;
          });
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const taskToDelete = state.tasks.find((t) => t.id === taskId);
      
      if (taskToDelete) {
        const status = taskToDelete.status;
        // Remove the task
        state.tasks = state.tasks.filter((t) => t.id !== taskId);
        
        // Reorder remaining tasks in the same status column
        const remainingTasks = state.tasks
          .filter((t) => t.status === status)
          .sort((a, b) => a.order - b.order);
        
        remainingTasks.forEach((t, index) => {
          t.order = index;
        });
      }
    },
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, updateTaskStatus, moveTask, reorderTasks, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
