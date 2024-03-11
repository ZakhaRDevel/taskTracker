import { TaskStatus } from '../enum/task-status';
import { TaskPriority } from '../enum/task-priority';
import { IAssignee } from './assignee';

export interface ITask {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignees?: IAssignee[];
}
