import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'task-list',
    component: ListTasksComponent,
  },
];
