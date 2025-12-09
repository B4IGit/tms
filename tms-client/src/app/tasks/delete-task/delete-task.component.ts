import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="delete-task">
      <h3>Are you sure you want to delete this task?</h3>

      <p><strong>Title:</strong> {{ taskTitle }}</p>

      <button class="task_btn delete" (click)="deleteTask()">
        Delete Task
      </button>
    </div>
  `,
  styles: [
    `
      .delete-task {
        padding: 1rem;
      }
      .task_btn.delete {
        background-color: #b83232;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        cursor: pointer;
      }
    `,
  ],
})
export class DeleteTaskComponent {
  @Input() taskId!: string;
  @Input() taskTitle!: string;

  @Output() deleted = new EventEmitter<string>();

  deleteTask() {
    this.deleted.emit(this.taskId);
  }
}
