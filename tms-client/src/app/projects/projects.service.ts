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

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(
      `${environment.apiBaseUrl}/api/projects/${projectId}`
    );
  }

  updateProject(
    projectId: string,
    project: UpdateProjectDTO
  ): Observable<{ message: string; id: string } | Project> {
    return this.http.patch<Project>(
      `${environment.apiBaseUrl}/api/projects/${projectId}`,
      project
    );
  }

  addProject(project: AddProjectDTO, projectId: number = 1000) {
    return this.http.post<Project>(`/api/projects/${projectId}`, project);
  }

  findProject(term: string): Observable<Project[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<Project[]>(`/api/projects/search`, {
      params,
    });
  }
}
