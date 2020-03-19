import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ParentTask } from './parentTask.model';
import { Project } from '../projects/project.model';
import { Task } from './task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private baseURI = 'http://localhost:8002/task/';
    constructor(private http: HttpClient) { }

    getPTasks(): any {
        return this.http.get(this.baseURI + 'getptasks');
    }

    getRelatedTasks(pid: number): any {
        return this.http.get(this.baseURI + 'getalltasks/' + pid);
    }

    getRelatedPTasks(pid: number): any {
        return this.http.get(this.baseURI + 'getallptasks/' + pid);
    }

    endPTask(task: ParentTask): any {
        return this.http.put(this.baseURI + 'endptask/' + task.parentTaskID, task);
    }

    endTask(task: Task): any {
        return this.http.put(this.baseURI + 'endtask/' + task.taskID, task);
    }

    getTask(tid: string): any {
        return this.http.get(this.baseURI + 'gettask/' + tid);
    }

    getPTask(ptid: number): any {
        return this.http.get(this.baseURI + 'getptask/' + ptid);
    }

    updateTask(task: Task): any {
        return this.http.put(this.baseURI + 'updateTask/' + task.taskID, task);
    }

    /*deleteProject(projID: number): any {
        console.log('Service User Id - ' + projID);
        return this.http.delete(this.baseURI + 'deleteproject/' + projID);
    }
    
    updateProject(project: Project): any {
        console.log('Service User Id - ' + project);
        return this.http.put(this.baseURI + 'updateproject/' + project.projID, project);
    }
    
    addProject(project: Project): any {
        console.log('Service User Id - ' + project);
        return this.http.post(this.baseURI + 'addproject', project);
    }*/

    addParentTask(task: ParentTask) {
        return this.http.post(this.baseURI + 'addparenttask', task);
    }

    addTask(task: Task) {
        return this.http.post(this.baseURI + 'addtask', task);
    }

}
