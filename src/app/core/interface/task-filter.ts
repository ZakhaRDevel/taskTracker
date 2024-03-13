import { TaskStatus } from '../enum/task-status';
import { IAssignee } from './assignee';

export interface TaskFilter {
  status: TaskStatus,
  assignees?: IAssignee[];
}
