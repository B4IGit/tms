import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, AddTaskDTO } from './task'; // make sure AddTaskDTO is exported
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiBaseUrl}/api/tasks`);
  }

  getTaskById(id: string): Observable<Task> {
    console.log(`${environment.apiBaseUrl}api/tasks/${id}`);
    return this.http.get<Task>(`${environment.apiBaseUrl}/api/tasks/${id}`);
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
