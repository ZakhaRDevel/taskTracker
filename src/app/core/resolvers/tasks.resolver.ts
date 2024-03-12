import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { EMPTY, mergeMap, of, take } from 'rxjs';
import { ITask } from '../interface/task';

export const tasksResolver: ResolveFn<ITask[]> = (route, state) => {
  const taskService = inject(TaskService);
  return taskService.getAllTasks().pipe(
    take(1),
    mergeMap((data) => {
      return data ? of(data) : EMPTY;
    })
  );
};
