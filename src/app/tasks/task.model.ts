export class Task {
    taskID: number;
    taskName: string;
    priority = 1;
    startDate: string;
    endDate: string;
    projID: number;
    userID: number;
    status = 0;
    parentTaskID: number;

    constructor() { }

}
