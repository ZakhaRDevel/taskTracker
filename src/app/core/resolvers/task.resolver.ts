import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { EMPTY, mergeMap, of, take } from 'rxjs';
import { ITask } from '../interface/task';

export const taskResolver: ResolveFn<ITask> = (route, state) => {
  const taskService = inject(TaskService);
  const id = route.params['id'];
  return taskService.getTask(id).pipe(
    take(1),
    mergeMap((data) => {
      return data ? of(data) : EMPTY;
    })
  );
};
