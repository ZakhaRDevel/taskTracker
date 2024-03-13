import { TaskStatus } from '../enum/task-status';
import { IAssignee } from './assignee';

export interface TaskFilter {
  status: string,
  assignees?: IAssignee[];
}
