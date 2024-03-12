import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { taskResolver } from './core/task.resolver';

export const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children: [
      {
        path:'',
        component: TasksComponent,
        resolve: {
          tasks: taskResolver
        }
      }
    ]
  }
];
