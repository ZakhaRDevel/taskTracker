import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITask } from '../interface/task';
import { TaskPriority } from '../enum/task-priority';
import { TaskStatus } from '../enum/task-status';
import { TaskFilter } from '../interface/task-filter';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskListUpdated = new BehaviorSubject<boolean>(false);

  private getTasks(): ITask[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  private saveTasks(tasks: ITask[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  notifyTaskListUpdated() {
    this.taskListUpdated.next(true);
  }

  getTaskListUpdateListener(): Observable<boolean> {
    return this.taskListUpdated.asObservable();
  }
  generateId(): string {
    return new Date().getTime().toString();
  }

  getAllTasks(filter: TaskFilter): Observable<ITask[]> {
    let tasks = this.getTasks();
    if (filter.status) {
      tasks = tasks.filter(task => task.status === filter.status);
    }
    if (filter.assignees && filter.assignees.length > 0) {
      const filterAssigneeIds = filter.assignees.map(assignee => assignee.id);
      tasks = tasks.filter(task =>
          task.assignees && task.assignees.some(assignee =>
            filterAssigneeIds.includes(assignee.id)
          )
      );
    }

    return of(tasks).pipe(delay(200));
  }


  getTask(id: string): Observable<ITask | undefined> {
    const task = this.getTasks().find(t => t.id === id);
    return of(task).pipe(delay(200));
  }

  createTask(taskData: Omit<ITask, 'id'>): Observable<ITask> {
    const tasks = this.getTasks();
    const newTask: ITask = {
      ...taskData,
      id: this.generateId(),
      priority: taskData.priority || TaskPriority.Medium,
      status: TaskStatus.ToDo
    };
    tasks.unshift(newTask);
    this.saveTasks(tasks);
    this.notifyTaskListUpdated();
    return of(newTask).pipe(delay(200));
  }

  updateTask(updatedTask: ITask): Observable<ITask> {
    let tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.saveTasks(tasks);
    }
    this.notifyTaskListUpdated();
    return of(updatedTask).pipe(delay(200));
  }

  deleteTask(id: string): Observable<{}> {
    let tasks = this.getTasks();
    tasks = tasks.filter(t => t.id !== id);
    this.saveTasks(tasks);
    this.notifyTaskListUpdated();
    return of({}).pipe(delay(200));
  }
}
