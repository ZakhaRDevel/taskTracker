import { Component, inject, OnInit } from '@angular/core';
import { ITask } from '../../core/interface/task';
import { ActivatedRoute } from '@angular/router';
import { TaskComponent } from '../../core/components/block/task/task.component';
import { TaskService } from '../../core/services/task.service';
import { merge, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TaskComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  tasks: ITask[];

  ngOnInit(): void {
    this.route.data.subscribe(({ tasks }) => {
      this.tasks = tasks || [];
    });
    merge(
      this.route.data.pipe(switchMap(({ tasks }) => {
        if (tasks && tasks.length > 0) {
          return of(tasks);
        }
        return this.taskService.getAllTasks();
      })),
      this.taskService.getTaskListUpdateListener().pipe(
        switchMap(updated => updated ? this.taskService.getAllTasks() : of(this.tasks))
      )
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
