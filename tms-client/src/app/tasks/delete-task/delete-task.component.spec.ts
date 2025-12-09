import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DeleteTaskComponent } from './delete-task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TaskService } from '../tasks.service';
import { Task } from '../task';

describe('DeleteTaskComponent', () => {
  let fixture: ComponentFixture<DeleteTaskComponent>;
  let component: DeleteTaskComponent;
  let taskService: TaskService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTaskComponent,
        RouterTestingModule,
        HttpClientTestingModule,],
      providers: [ TaskService],
    }).compileComponents();

    
  });
  it('should call service when a task id is selected and render title', () => {
    const select: HTMLSelectElement =
      fixture.nativeElement.querySelector('#taskSelect');

    const selectedId = select.options[1].value; // "650c1f1e1c9d440000a1b1c1"
    select.value = selectedId;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(taskService.deleteTask).toHaveBeenCalledTimes(1);
    expect(taskService.deleteTask).toHaveBeenCalledWith(selectedId);

    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Task');
  });


 it('should create', () => {
     fixture = TestBed.createComponent(DeleteTaskComponent);
     component = fixture.componentInstance;
     expect(component).toBeTruthy();
   });
  });

