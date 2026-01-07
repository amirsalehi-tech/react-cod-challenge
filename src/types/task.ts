export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  order: number;
  completed: boolean; // Kept for backward compatibility
}

export type FilterStatus = 'all' | 'todo' | 'in-progress' | 'done';
