import { Component, Input } from '@angular/core';
import { ITask } from '../../../interface/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task: ITask;

}
