import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IAssignee } from '../interface/assignee';

@Injectable({
  providedIn: 'root'
})
export class AssigneeService {
  MOCK_ASSIGNEES: IAssignee[] = [
    { id: '1', name: 'Иван Иванов', email: 'ivan.ivanov@gmail.com' },
    { id: '2', name: 'Мария Петрова', email: 'maria.petrova@gmail.com' },
    { id: '3', name: 'Алексей Сидоров', email: 'alexey.sidorov@gmail.com' }
  ];

  getAssignees(): Observable<IAssignee[]> {
    return of(this.MOCK_ASSIGNEES).pipe(delay(200));
  }
}
