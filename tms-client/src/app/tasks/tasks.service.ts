import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, AddTaskDTO } from './task'; // make sure AddTaskDTO is exported
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiBaseUrl}/api/tasks`);
  }

  addTask(task: AddTaskDTO, projectId: number = 1000) {
    return this.http.post<Task>(
      `${environment.apiBaseUrl}/api/tasks/${projectId}`,
      task
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${environment.apiBaseUrl}/api/tasks/${id}`);
  }
}
