import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../projects.service';
import { Project, UpdateProjectDTO } from '../project';

@Component({
  selector: 'app-update-projects',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="project-update-page">
      <h1 class="project-update-page_title">Update Project</h1>
      <h4 class="project-update-page_subtitle">
        Modify the project's name, description, and dates.
      </h4>

      <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" novalidate>
        <!-- Project selector (dropdown) -->
        <div class="project-update-page_form-group">
          <label for="projectId" class="project-update-page_form-label">Select Project</label>
          <select
            id="projectId"
            class="project-update-page_form-control"
            formControlName="projectId"
          >
            <option value="">
              {{ loadingProjects ? 'Loading projects…' : '-- Select a project --' }}
            </option>
            <option *ngFor="let p of projects" [value]="p._id">
              {{ p.name }}
            </option>

          </select>
          <div class="error-message" style="color: #7c0505;"
               *ngIf="projectForm.controls['projectId'].invalid && projectForm.controls['projectId'].touched">
            <small *ngIf="projectForm.controls['projectId'].errors?.['required']">
              Please select a project to update.
            </small>
          </div>
        </div>

        <div class="project-update-page_form-group">
          <label for="name" class="project-update-page_form-label">Project Name</label>
          <input
            id="name"
            type="text"
            class="project-update-page_form-control"
            formControlName="name"
            placeholder="Enter project name"
          />
          <small class="error" *ngIf="projectForm.get('name')?.invalid && projectForm.get('name')?.touched">
            Name is required (min 3 characters).
          </small>
        </div>

        <div class="project-update-page_form-group">
          <label for="description" class="project-update-page_form-label">Description</label>
          <textarea
            id="description"
            rows="4"
            class="project-update-page_form-control"
            formControlName="description"
            placeholder="Brief description of the project"
          ></textarea>
        </div>

        <div class="project-update-page_form-group">
          <label for="startDate" class="project-update-page_form-label">Start Date</label>
          <input
            id="startDate"
            type="date"
            class="project-update-page_form-control"
            formControlName="startDate"
          />
        </div>

        <div class="project-update-page_form-group">
          <label for="endDate" class="project-update-page_form-label">End Date</label>
          <input
            id="endDate"
            type="date"
            class="project-update-page_form-control"
            formControlName="endDate"
          />
        </div>

        <button class="btn project-update-page_btn" type="submit" [disabled]="projectForm.invalid">Save</button>
      </form>
    </div>
  `,
  styles: `
    .project-update-page {
      max-width: 720px;
      margin: 0 auto;
      padding: 1rem;
    }
    .project-update-page_title {
      margin: 0 0 .25rem 0;
    }
    .project-update-page_subtitle {
      margin: 0 0 1rem 0;
      color: #666; font-weight: 400;
    }
    .project-update-page_form-group {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      gap: .25rem;
    }
    .project-update-page_form-label {
      font-weight: 600;
    }
    .project-update-page_form-control {
      padding: .5rem .75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .project-update-page_btn {
      background: var(--medium_blue);
      color: #fff;
      border: 0;
      padding: .5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .project-update-page_btn:disabled {
      opacity: .6;
      cursor: not-allowed;
    }
    .error {
      color: #e74c3c;
      margin-top: .75rem;
    }
  `
})
export class UpdateProjectsComponent implements OnInit {
  loadingProjects = false;
  projects: Project[] = [];

  projectForm: FormGroup = this.fb.group({
    projectId: ['', Validators.required],
    name: [null, Validators.required],
    description: [null],
    startDate: [null],
    endDate: [null],
    dateCreated: [null]
  })

  constructor(private fb: FormBuilder, private router: Router, private projectService: ProjectService) {
  }

  ngOnInit() {
    // Load projects from the server
    this.loadingProjects = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = [...projects].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        this.loadingProjects = false;
        this.projectForm.get('projectId')?.enable();
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });

    // When a project is selected, fetch its latest data and prefill the form
    this.projectForm.get('projectId')!.valueChanges.subscribe((id: string | null) => {
      if (!id) {
        // No project selected
        this.projectForm.patchValue({
          title: null,
          description: null,
          startDate: null,
          endDate: null,
          dateCreated: null
        });
        this.setEditControlsEnabled(false);
        return;
      }
      this.projectService.getProjectById(id).subscribe({
        next: (project) => {
          this.patchFormFromProject(project);
          this.setEditControlsEnabled(true);
        },
        error: () => {
          this.setEditControlsEnabled(false);
        }
      })
    })

    // Initially disable edit controls until a project is selected
    this.setEditControlsEnabled(false);
  }

  private patchFormFromProject(project: Project) {
    this.projectForm.patchValue({
      name: project.name ?? null,
      description: project.description ?? null,
      startDate: project.startDate ?? null,
      endDate: project.endDate ?? null,
      dateCreated: project.dateCreated ?? null
    })
  }

  // Converts ISO string (UTC) to yyyy-MM-ddTHH:mm for datetime-local input
  private toLocalDateTimeInput(iso: string): string {
    try {
      const d = new Date(iso);
      const pad = (n: number) => n.toString().padStart(2, '0');
      const yyyy = d.getFullYear();
      const mm = pad(d.getMonth() + 1);
      const dd = pad(d.getDate());
      const hh = pad(d.getHours());
      const min = pad(d.getMinutes());
      return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    } catch {
      return '';
    }
  }

  setEditControlsEnabled(enabled: boolean) {
    const controls = ['name', 'description', 'startDate', 'endDate', 'dateCreated'];
    controls.forEach((name) => {
      const control = this.projectForm.get(name);
      if (!control) return;
      if (enabled) {
        control.enable({ emitEvent: false });
      } else {
        control.disable({ emitEvent: true });
      }
    });
  }

  onSubmit() {
    if (this.projectForm.invalid) return;

    const id = this.projectForm.controls['projectId'].value as string;

    const updateProject: UpdateProjectDTO = {
      name: this.projectForm.controls['name'].value,
      description: this.projectForm.controls['description'].value,
      startDate: this.toLocalDateTimeInput(this.projectForm.controls['startDate'].value as string),
      endDate: this.toLocalDateTimeInput(this.projectForm.controls['endDate'].value as string),
    }

    console.log('Updating Project:', updateProject);
    this.projectService.updateProject(id, updateProject).subscribe({
      next: (result) => {
        console.log(`Project updated successfully:', ${result.message}`);
        this.router.navigate(['/projects/projects-list']);
      },

      error: (error) => {
        console.error('Error updating project:', error);
      }
    })
  }
}
