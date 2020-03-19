import { User } from '../users/user.model';

export class Project {
    public projID: number;
    public projName: string;
    public startDate: string;
    public endDate: string;
    public priority = 1;
    public userID: number;
    public status: string;
    public noOfTasks = 0;
    public noOfCompTasks = 0;
    public user: User;

    constructor() { }
}

