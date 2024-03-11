import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITask } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  generateId(): string {
    return new Date().getTime().toString();
  }
  private getTasks(): ITask[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  private saveTasks(tasks: ITask[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getAllTasks(): Observable<ITask[]> {
    return of(this.getTasks()).pipe(delay(200));
  }

  getTask(id: string): Observable<ITask | undefined> {
    const task = this.getTasks().find(t => t.id === id);
    return of(task).pipe(delay(200));
  }

  createTask(task: Omit<ITask, 'id'>): Observable<ITask> {
    const tasks = this.getTasks();
    const newTask = { ...task, id: this.generateId() }; // Добавление id к задаче
    tasks.push(newTask);
    this.saveTasks(tasks);
    return of(newTask).pipe(delay(200));
  }

  updateTask(updatedTask: ITask): Observable<ITask> {
    let tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.saveTasks(tasks);
    }
    return of(updatedTask).pipe(delay(200));
  }

  deleteTask(id: string): Observable<{}> {
    let tasks = this.getTasks();
    tasks = tasks.filter(t => t.id !== id);
    this.saveTasks(tasks);
    return of({}).pipe(delay(200));
  }
}
