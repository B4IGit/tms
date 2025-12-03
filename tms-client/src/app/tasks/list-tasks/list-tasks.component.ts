import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task';
import { TaskService } from '../tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="task-container">
      <h2>All Tasks</h2>

      <p *ngIf="loading">Loading tasks...</p>
      <p *ngIf="serverMessage" [ngClass]="serverMessageType">
        {{ serverMessage }}
      </p>

      <ul *ngIf="!loading && tasks.length > 0; else noTasks">
        <li *ngFor="let task of tasks" class="task-item">
          <strong>{{ task.title }}</strong
          ><br />
          <small *ngIf="task.description">{{ task.description }}</small>
        </li>
      </ul>

      <ng-template #noTasks>
        <p>No tasks found.</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .task-container {
        padding: 1rem;
        max-width: 600px;
        margin: auto;
      }
      .task-item {
        padding: 0.5rem 0;
      }
      .success {
        color: green;
      }
      .error {
        color: red;
      }
    `,
  ],
})
export class ListTasksComponent {
  tasks: Task[] = [];
  loading = true;
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.loading = false;
        this.serverMessage = `Retrieved ${tasks.length} task(s) successfully.`;
        this.serverMessageType = 'success';
      },
      error: (err: any) => {
        this.loading = false;
        this.serverMessage = 'Error retrieving tasks.';
        this.serverMessageType = 'error';
        console.error('Error occurred while retrieving tasks:', err);
      },
    });
  }

}
