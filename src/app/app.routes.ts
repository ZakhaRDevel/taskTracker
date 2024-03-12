import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { tasksResolver } from './core/resolvers/tasks.resolver';
import { TaskComponent } from './pages/task/task.component';
import { taskResolver } from './core/resolvers/task.resolver';

export const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children: [
      {
        path:'',
        component: TasksComponent,
        resolve: {
          tasks: tasksResolver
        }
      },
      {
        path: 'tasks/:id',
        component: TaskComponent,
        resolve: {
          task: taskResolver
        }
      }
    ]
  }
];
