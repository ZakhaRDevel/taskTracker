import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ITask } from '../../core/interface/task';
import { Form } from '../../core/abstract/form.abstract';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { DatepickerComponent } from '../../core/components/inputs/datepicker/datepicker.component';
import { InputComponent } from '../../core/components/inputs/input/input.component';
import { InputSelectComponent } from '../../core/components/inputs/input-select/input-select.component';
import { TaskPriority } from '../../core/enum/task-priority';
import { TaskStatus } from '../../core/enum/task-status';
import { IAssignee } from '../../core/interface/assignee';
import { AssigneeService } from '../../core/services/assignee.service';
import { TaskService } from '../../core/services/task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    DatepickerComponent,
    InputComponent,
    InputSelectComponent,
    ReactiveFormsModule,
    DatePipe,
    RouterLink
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent extends Form implements OnInit,OnDestroy {
  private destroy$ = new Subject<void>();
  private route = inject(ActivatedRoute);
  private assigneeService = inject(AssigneeService);
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  task: ITask;
  isView = true;
  taskPriorities = Object.values(TaskPriority).map(priority => ({ label: priority, value: priority }));
  taskStatus = Object.values(TaskStatus).map(status => ({ label: status, value: status }));
  assignees: IAssignee[];
  today = new Date();
  formGroup: FormGroup;

  ngOnInit(): void {
    this.route.data.pipe(
      switchMap(({ task }) => {
        this.setupForm(task);
        return this.taskService.getTaskListUpdateListener().pipe(
          switchMap((updated) => updated ? this.taskService.getTask(task.id) : of(task))
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe((task) => this.setupForm(task));

    this.assigneeService.getAssignees().pipe(takeUntil(this.destroy$)).subscribe(assignees => {
      this.assignees = assignees;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupForm(task: ITask) {
    this.task = task;
    this.formGroup = this.fb.group({
      id: this.fb.control(task.id),
      title: this.fb.control(task.title, [Validators.required]),
      description: this.fb.control(task.description),
      priority: this.fb.control(task.priority),
      assignees: this.fb.control(task.assignees),
      status: this.fb.control(task.status),
      deadline: this.fb.control(task.deadline)
    });
  }

  prepareRequest(): Observable<ITask> {
    const data = this.formGroup.getRawValue();
    return this.taskService.updateTask(data);
  }

  override onRequestSuccess(value: ITask) {
    super.onRequestSuccess(value);
    this.isView = true;
  }
}
