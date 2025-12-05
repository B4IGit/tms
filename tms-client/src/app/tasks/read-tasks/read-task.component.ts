import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-read-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-task.component.html'
})
export class ReadTaskComponent implements OnInit {
  task?: Task;
  loading = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private tasks: TaskService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Missing task id.';
      return;
    }

    this.loading = true;
    this.tasks.getTaskById(id).subscribe({
      next: (t: Task) => { this.task = t; this.loading = false; },
      error: () => { this.error = 'Unable to load task.'; this.loading = false; }
    });
  }
}
