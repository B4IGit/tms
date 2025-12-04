import { Routes, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { TaskAddComponent } from './tasks/task-add/task-add.component';
import { TaskFindComponent } from './tasks/find-tasks/find-tasks.component';
import { ReadTaskComponent } from './tasks/read-tasks/read-task.component';

// Lazy-load the MainLayout which contains the aside navigation
const loadMainLayout = () =>
  import('./layouts/main-layout/main-layout.component').then(
    (m) => m.MainLayoutComponent
  );

// Routes that render WITHOUT the aside
const baseRoutes: Route = { path: '', component: HomeComponent };

// Routes that render WITH the aside (tasks and projects only)
const layoutRoutes: Route = {
  path: '',
  loadComponent: loadMainLayout,
  children: [
    // Tasks
    { path: 'task-list', component: ListTasksComponent },
    { path: 'tasks', redirectTo: 'task-list', pathMatch: 'full' },
    { path: 'tasks/add', component: TaskAddComponent },
    { path: 'tasks/search', component: TaskFindComponent },
    { path: 'tasks/read', component: ReadTaskComponent },

    // Projects (placeholder children can be added later)
    { path: 'projects', children: [] },
  ],
};

export const routes: Routes = [
  baseRoutes,
  layoutRoutes,
  { path: '**', redirectTo: '' },
];
