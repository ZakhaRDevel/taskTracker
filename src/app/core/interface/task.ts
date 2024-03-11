import { IUser } from './user';

export interface ITask {
    title: string,
    name: string,
    deadline: string,
    priority: string,
    status: string,
    performers: IUser[]
}
