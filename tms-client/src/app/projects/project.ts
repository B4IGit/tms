export interface Project {
  _id: string;
  projectId: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  dateCreated?: string;
  dateModified?: string;
}
export type UpdateProjectDTO = Omit<
  Project,
  '_id' | 'ProjectId' | 'dateCreated' | 'dateModified'
>;

export type AddProjectDTO = Omit<Project, '_id' | 'dateModified' | 'projectId'>;
