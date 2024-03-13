import { Component, inject, OnInit } from '@angular/core';
import { ITask } from '../../core/interface/task';
import { ActivatedRoute } from '@angular/router';
import { TaskComponent } from '../../core/components/block/task/task.component';
import { TaskService } from '../../core/services/task.service';
import { merge, of, switchMap } from 'rxjs';
import { TaskFilter } from '../../core/interface/task-filter';
import { InputSelectComponent } from '../../core/components/inputs/input-select/input-select.component';
import { TaskStatus } from '../../core/enum/task-status';
import { IAssignee } from '../../core/interface/assignee';
import { AssigneeService } from '../../core/services/assignee.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent,
    InputSelectComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private assigneeService = inject(AssigneeService);
  tasks: ITask[];
  filters = {} as TaskFilter;
  taskStatus = Object.values(TaskStatus).map(status => ({ label: status, value: status }));
  assignees: IAssignee[];
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

    this.assigneeService.getAssignees().subscribe((assignees) => {
      this.assignees = assignees;
    });
  }

  onStatusFilter(status: { label: string, value: string }) {
    this.filters.status = status.value;
    this.getList();
  }

  onAssigneesFilter(assignees: IAssignee[]) {
    this.filters.assignees = assignees
    this.getList();
  }
  getList() {
    this.taskService.getAllTasks(this.filters).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
