export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

export type FilterStatus = 'all' | 'completed' | 'active';
