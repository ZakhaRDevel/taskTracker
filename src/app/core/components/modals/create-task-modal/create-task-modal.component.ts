import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';
import { Form } from '../../../abstract/form.abstract';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { InputComponent } from '../../inputs/input/input.component';
import { TaskService } from '../../../services/task.service';
import { ITask } from '../../../interface/task';
import { InputSelectComponent } from '../../inputs/input-select/input-select.component';
import { TaskPriority } from '../../../enum/task-priority';
import { AssigneeService } from '../../../services/assignee.service';
import { IAssignee } from '../../../interface/assignee';
import { TaskStatus } from '../../../enum/task-status';
import { DatepickerComponent } from '../../inputs/datepicker/datepicker.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [
    ModalLayoutComponent,
    ReactiveFormsModule,
    InputComponent,
    InputSelectComponent,
    DatepickerComponent
  ],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.scss'
})
export class CreateTaskModalComponent extends Form implements OnInit {
  private dialogRef = inject(MatDialogRef<CreateTaskModalComponent>);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private taskService = inject(TaskService);
  taskPriorities = Object.values(TaskPriority).map(priority => ({ label: priority, value: priority }));
  taskStatus = Object.values(TaskStatus).map(status => ({ label: status, value: status }));
  private assigneeService = inject(AssigneeService);
  assignees: IAssignee[];
  today = new Date();

  formGroup: FormGroup = this.fb.group({
    title: this.fb.control(null, [Validators.required]),
    description: this.fb.control(null),
    priority: this.fb.control(null),
    assignees: this.fb.control([]),
    status: this.fb.control(null),
    deadline: this.fb.control(null)
  });

  ngOnInit(): void {
    this.assigneeService.getAssignees().subscribe((assignees)=> {
      this.assignees = assignees
    })
  }

  prepareRequest(): Observable<ITask> {
    const data = this.formGroup.getRawValue();
    return this.taskService.createTask(data);
  }

  override onRequestSuccess(value: ITask) {
    super.onRequestSuccess(value);
    this.closeModal();
    this.router.navigateByUrl('');
  }

  closeModal() {
    this.dialogRef.close();
  }


}
