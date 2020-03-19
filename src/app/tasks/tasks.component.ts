import { Component, OnInit } from '@angular/core';
import { User } from '../users/user.model';
import { Project } from '../projects/project.model';
import { Task } from './task.model';
import { ProjectService } from '../projects/project.service';
import { TaskService } from './task.service';
import { ParentTask } from './parentTask.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  display = 'none';
  searchItem: string;

  projectsfailureMessage = '';
  pTasksfailureMessage = '';
  tasksfailureMessage = '';

  endPTasksuccessMessage = '';
  endPTaskfailureMessage = '';

  endTasksuccessMessage = '';
  endTaskfailureMessage = '';

  retrievedProjects: Project[] = [];

  tasks: Task[] = [];

  retrievedTasks: Task[] = [];
  retrievedPTasks: ParentTask[] = [];
  resultArray = [];

  public user: User = new User();
  public project = new Project();

  constructor(private projectSvc: ProjectService, private taskSvc: TaskService) { }

  ngOnInit() {
  }

  openProjectModal() {
    this.display = 'block';
    this.searchItem = '';
    this.retreiveAllProjects();
  }

  onEndPTask(task: ParentTask){
    this.taskSvc.endPTask(task).subscribe(
      response => {
        this.endPTasksuccessMessage = 'Parent Task ended Successfully !';
        this.select();
      },
      error => this.endPTaskfailureMessage = 'Parent Task end Failed. Try Again Later');
  }

  onEndTask(task: Task){
    this.taskSvc.endTask(task).subscribe(
      response => {
        this.endTasksuccessMessage = 'Task ended Successfully !';
        console.log(this.endTasksuccessMessage);
        this.select();
      },
      error => this.endTaskfailureMessage = 'Tasks end Failed. Try Again Later');
  }

  closeModal() {
    this.display = 'none';
  }

  select() {
    this.searchItem = this.project.projName;
    this.display = 'none';
    this.retrieveRelatedTasks(this.project.projID);
    this.retrieveRelatedPTasks(this.project.projID);
  }

  selectedProject(project: Project, event: Event) {
    event.preventDefault();
    this.project.projName = project.projName;
    this.project.projID = project.projID;
    this.searchItem = project.projName;
  }

  retrieveRelatedTasks(pid: number) {
    this.taskSvc.getRelatedTasks(pid).subscribe(
      response => {
        for (const key in response) {
          if (key === 'tasks') {
            this.retrievedTasks = response[key];
            console.log(this.retrievedTasks);
          } else if (key === 'port') {
            console.log(response[key]);
          }
        }
      },
      error => this.tasksfailureMessage = 'Tasks retrieval Failed. Try Again Later');
  }

  retrieveRelatedPTasks(pid: number) {
    this.taskSvc.getRelatedPTasks(pid).subscribe(
      response => {
        for (const key in response) {
          if (key === 'pTasks') {
            this.retrievedPTasks = response[key];
            console.log('pTask');
            console.log(this.retrievedPTasks);
          } else if (key === 'port') {
            console.log(response[key]);
          }
        }
      },
      error => this.pTasksfailureMessage = 'Parent Tasks retrieval Failed. Try Again Later');
  }

  sortByPriority() {
    this.retrievedTasks = this.retrievedTasks.sort((a, b) => (a.priority > b.priority) ? 1 : -1);
  }

  sortByEndDate() {
    this.retrievedTasks = this.retrievedTasks.sort((a, b) => (a.endDate) > (b.endDate) ? 1 : -1);
  }

  sortByStartDate() {
    this.retrievedTasks = this.retrievedTasks.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1);
  }

  retreiveAllProjects() {
    this.projectSvc.getProjects().subscribe(
      response => {
        for (const key in response) {
          if (key === 'projects') {
            this.retrievedProjects = response[key];
            console.log(this.retrievedProjects);
          } else if (key === 'port') {
            console.log(response[key]);
          }
        }
      },
      error => this.projectsfailureMessage = 'Projects retrieval Failed. Try Again Later');
  }

}
