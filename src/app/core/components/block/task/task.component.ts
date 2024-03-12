import { Component, inject, Input } from '@angular/core';
import { ITask } from '../../../interface/task';
import { TaskService } from '../../../services/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  private taskService = inject(TaskService);
  @Input() task: ITask;


  deleteTask(id: string) {
    this.taskService.deleteTask(id)
  }
}
