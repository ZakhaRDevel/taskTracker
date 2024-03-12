import { Component, inject, Input } from '@angular/core';
import { ITask } from '../../../interface/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
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
