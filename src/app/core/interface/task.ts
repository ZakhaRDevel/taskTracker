import { IUser } from './user';
import { TaskStatus } from '../enum/task-status';
import { TaskPriority } from '../enum/task-priority';

export interface ITask {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignees?: IUser[];
}
