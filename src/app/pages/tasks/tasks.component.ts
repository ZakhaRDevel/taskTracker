import { Component, inject, OnInit } from '@angular/core';
import { ITask } from '../../core/interface/task';
import { ActivatedRoute } from '@angular/router';
import { TaskComponent } from '../../core/components/block/task/task.component';
import { TaskService } from '../../core/services/task.service';
import { merge, of, switchMap } from 'rxjs';
import { TaskFilter } from '../../core/interface/task-filter';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  tasks: ITask[];
  filters = {} as TaskFilter;

  ngOnInit(): void {
    this.route.data.subscribe(({ tasks }) => {
      this.tasks = tasks || [];
    });
    merge(
      this.route.data.pipe(switchMap(({ tasks }) => {
        if (tasks && tasks.length > 0) {
          return of(tasks);
        }
        return this.taskService.getAllTasks(this.filters);
      })),
      this.taskService.getTaskListUpdateListener().pipe(
        switchMap(updated => updated ? this.taskService.getAllTasks(this.filters) : of(this.tasks))
      )
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  getList() {
    this.taskService.getAllTasks(this.filters);
  }
}
