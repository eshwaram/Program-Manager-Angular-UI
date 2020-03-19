import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private baseURI = 'http://localhost:8001/project/';
    constructor(private http: HttpClient) { }

    getProjects(): any {
        return this.http.get(this.baseURI + 'getprojects');
    }

    deleteProject(projID: number): any {
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
    }

    getProject(pid: number): any {
        return this.http.get(this.baseURI + 'getproject/' + pid);
    }

}
