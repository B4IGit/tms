import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AddProjectDTO, Project, UpdateProjectDTO } from './project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`/api/projects`);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`/api/projects/${id}`
    );
  }

  addProject(project: AddProjectDTO, projectId: number = 1000) {
    return this.http.post<Project>(`/api/projects/${projectId}`,
      project
    );
  }

  updateProject(id: string, project: UpdateProjectDTO) {
    return this.http.patch<{ message: string; id: string }>(
      `/api/projects/${id}`,
      project
    );
  }

  findProject(term: string): Observable<Project[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<Project[]>(`/api/projects/search`,
      {
        params,
      }
    );
  }
}
