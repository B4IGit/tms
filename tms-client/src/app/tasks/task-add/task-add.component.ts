import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../tasks.service';
import { AddTaskDTO } from '../task';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="task-add-page">
      <h1 class="task-add-page_title">Add New Task</h1>
      <h4 class="task-add-page_subtitle">Fill in the details to create a new task</h4>

      <div class="add-task-page_card">
        <form [formGroup]="taskForm" class="add-task-page_form">

          <!-- Title -->
          <div class="add-task-page_form-group">
            <label for="title" class="task-add-page_form-label">Task Name</label>
            <input type="text" id="title" class="task-add-page_form-control" formControlName="title">
          </div>

          <!-- Description -->
          <div class="task-add-page_form-group">
            <label for="description" class="task-add-page_form-label">Task Description</label>
            <textarea id="description" rows="10" class="task-add-page_form-control" formControlName="description"></textarea>
          </div>

          <!-- Status Dropdown -->
          <div class="task-add-page_form-group">
            <label for="status" class="task-add-page_form-label">Status</label>
            <select id="status" class="task-add-page_form-control" formControlName="status">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <!-- Priority Dropdown -->
          <div class="task-add-page_form-group">
            <label for="priority" class="task-add-page_form-label">Priority</label>
            <select id="priority" class="task-add-page_form-control" formControlName="priority">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <!-- Due Date -->
          <div class="task-add-page_form-group">
            <label for="dueDate" class="task-add-page_form-label">Due Date</label>
            <input type="datetime-local" id="dueDate" class="task-add-page_form-control" formControlName="dueDate">
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn task-add-page_btn" (click)="onSubmit()">Add Task</button>
        </form>
      </div>
      <a class="task-add-page_link" routerLink="/tasks">Return</a>
    </div>
  `,
  styles: `
  .task-add-page {
    max-width: 80%;
    margin: 0 auto;
    padding: 2rem;
  }

  .task-add-page_title {
    text-align: center;
    color: var(--dark_blue);
  }

  .task-add-page_subtitle {
    text-align: center;
    color: var(--medium_blue);
    font-size: 0.9rem;
    font-style: italic;
    margin-bottom: 1.5rem;
  }

  .add-task-page_card {
    background-color: var(--bg_color);
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-top: 1.5rem;
  }

  .add-task-page_form {
    display: flex;
    flex-direction: column;
  }

  .add-task-page_form-group {
    margin-bottom: 1rem;
  }

  .task-add-page_form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  .task-add-page_form-control {
    width: 100%;
    padding: 0.5rem;
    border: 2px solid var(--medium_blue);
    border-radius: 0.25rem;
  }

  .task-add-page_link {
    color: var(--medium_blue);
    text-decoration: none;
    display: block;
  }

  .task-add-page_link:hover {
    text-decoration: underline;
  }

  `
})
export class TaskAddComponent {
  taskForm: FormGroup = this.fb.group({
    title: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    description: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
    status: [null, Validators.required],
    priority: [null, Validators.required],
    dueDate: [null, Validators.required]
    }
  );

  constructor(private fb: FormBuilder, private router: Router, private taskService: TaskService) {}

  onSubmit() {
    if (this.taskForm.valid) {
      const dueDate = new Date(this.taskForm.controls["dueDate"].value).toISOString();

      const newTask: AddTaskDTO = {
        title: this.taskForm.controls["title"].value,
        description: this.taskForm.controls["description"].value,
        status: this.taskForm.controls["status"].value,
        priority: this.taskForm.controls["priority"].value,

      };

      console.log("Creating Task: ", newTask);

      this.taskService.addTask(newTask).subscribe({
        next: (result: any) => {
          console.log(`Task created successfully: ${result.message}`);
          this.router.navigate(['/tasks']);
        },

        error: (error) => {
          console.error("Error creating task", error);
        }
        }
      )
    }
  }
}
