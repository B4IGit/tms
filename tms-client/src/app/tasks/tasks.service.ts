import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task } from './task';
import { AddTaskDTO } from './task';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks');
  }
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`/api/tasks/${id}`);
  }
  addTask(task: AddTaskDTO, projectId: number = 1000) {
    return this.http.post<Task>(
      `${environment.apiBaseUrl}/api/tasks/${projectId}`,
      task
    );
  }

  findTask(term: string): Observable<Task[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<Task[]>(`${environment.apiBaseUrl}/api/tasks/search`, {
      params,
    });
  }
}
