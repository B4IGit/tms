import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReadTaskComponent } from './read-task.component';
import { TaskService } from '../tasks.service';
import { Task } from '../task';

describe('ReadTaskComponent', () => {
  let fixture: ComponentFixture<ReadTaskComponent>;
  let component: ReadTaskComponent;

  const routeStub = {
    snapshot: { paramMap: { get: (_: string) => '123' } }
  };

  const mockTask: Task = {
    _id: '123',
    title: 'Test Task',
    status: 'pending',
    priority: 'low',
    dueDate: '2025-12-31',
    description: 'Demo description'
  };

  let serviceStub: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    serviceStub = jasmine.createSpyObj<TaskService>('TaskService', ['getTaskById']);
    serviceStub.getTaskById.and.returnValue(of(mockTask));

    await TestBed.configureTestingModule({
      imports: [ReadTaskComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: TaskService, useValue: serviceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadTaskComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call service with id from route and render title', () => {
    fixture.detectChanges(); // triggers ngOnInit
    expect(serviceStub.getTaskById).toHaveBeenCalledOnceWith('123');

    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Task');
  });

  it('should show error message when service fails', () => {
    serviceStub.getTaskById.and.returnValue(throwError(() => new Error('boom')));
    fixture.detectChanges();

    expect(component.error).toBeDefined();
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.textContent).toContain('Unable to load task.');
  });
});
