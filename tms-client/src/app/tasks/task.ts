export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

export type AddTaskDTO = Omit<Task, '_id' | 'dateModified'>;
