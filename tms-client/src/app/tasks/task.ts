export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  dateCreated: string;
  dateModified: string;
  projectId: number;
}
