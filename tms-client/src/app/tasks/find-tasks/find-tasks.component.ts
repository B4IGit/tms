import { Component } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../tasks.service';
import { Task } from '../task';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-find',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, NgIf, NgForOf],
  template: `
    <div class="task-find-page" [formGroup]="taskForm">
      <h1 class="task-find-page_title">Find Task</h1>
      <h4 class="task-find-page_subtitle">
        Fill in the search bar to find tasks
      </h4>

      <div class="add-task-page_form-group">
        <label for="term" class="task-add-page_form-label">Task Name</label>
        <input
          type="text"
          id="term"
          class="task-add-page_form-control"
          formControlName="term"
        />

        <div
          class="error-message"
          style="color: #7c0505;"
          *ngIf="
            taskForm.controls['term'].invalid &&
            taskForm.controls['term'].touched
          "
        >
          <small *ngIf="taskForm.controls['term'].errors?.['required']">
            Task search term is required.
          </small>
          <small *ngIf="taskForm.controls['term'].errors?.['minlength']">
            Task search term must be at least 3 characters long.
          </small>
        </div>
      </div>

      <button
        type="button"
        class="btn task-find-page_btn"
        (click)="onSubmit()"
        [disabled]="taskForm.invalid"
      >
        Search Task
      </button>

      <!-- Results section -->
      <div *ngIf="searched">
        <h3>Search Results</h3>
        <p *ngIf="tasks.length === 0">No tasks found.</p>

        <ul *ngIf="tasks.length > 0">
          <li *ngFor="let task of tasks">
            <strong>{{ task.title }}</strong> - {{ task.description }}
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .task-find-page {
        max-width: 80%;
        margin: 0 auto;
        padding: 2rem;
      }

      .task-find-page_title {
        text-align: center;
        color: var(--dark_blue);
      }

      .task-find-page_subtitle {
        text-align: center;
        color: var(--medium_blue);
        font-size: 0.9rem;
        font-style: italic;
        margin-bottom: 1.5rem;
      }
    `,
  ],
})
export class TaskFindComponent {
  taskForm: FormGroup = this.fb.group({
    term: [null, [Validators.required, Validators.minLength(3)]],
  });

  tasks: Task[] = [];
  searched = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService
  ) {}

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const term = this.taskForm.controls['term'].value;
    console.log('Searching Tasks for:', term);

    this.taskService.findTask(term).subscribe({
      next: (result: Task[]) => {
        this.searched = true;
        this.tasks = result;
        console.log('Tasks found:', result);
      },
      error: (error) => {
        this.searched = true;
        this.tasks = [];
        console.error('Error finding task', error);
      },
    });
  }
}
