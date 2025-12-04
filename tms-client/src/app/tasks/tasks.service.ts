import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, AddTaskDTO } from './task'; // make sure AddTaskDTO is exported

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks');
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`/api/tasks/${id}`);
  }

  
  addTask(payload: AddTaskDTO): Observable<Task> {
    return this.http.post<Task>('/api/tasks', payload);
  }
}
