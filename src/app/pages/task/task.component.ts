import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../../core/interface/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  private route = inject(ActivatedRoute);
  task: ITask;

  ngOnInit(): void {
    this.route.data.subscribe(({ task }) => {
      this.task = task;
    });
  }
}
