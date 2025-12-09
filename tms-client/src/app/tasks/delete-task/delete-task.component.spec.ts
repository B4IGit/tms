import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DeleteTaskComponent } from './delete-task.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('DeleteTaskComponent', () => {
  let fixture: ComponentFixture<DeleteTaskComponent>;
  let component: DeleteTaskComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTaskComponent, RouterTestingModule], 
      providers: [
    
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteTaskComponent);
    component = fixture.componentInstance;
    component.taskId = '123';
    component.taskTitle = 'Fix login bug';
    fixture.detectChanges();
  });

  it('should render confirmation message with task title/id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Fix login bug');
    expect(el.textContent).toContain('123');
  });
});
