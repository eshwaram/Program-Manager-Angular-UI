import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from './project.model';
import { User } from '../users/user.model';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ProjectService } from './project.service';
import { UserService } from '../users/user.service';
import { TaskService } from '../tasks/task.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [DatePipe]
})
export class ProjectsComponent implements OnInit {
  enableDate: boolean;
  dateType: string;
  notAllowDates = true;

  datesValid = true;
  public user: User = new User();
  public project = new Project();

  retrievedUsers: User[] = [];

  retrievedProjects: Project[] = [];

  @ViewChild('f', { static: false }) projForm: NgForm;

  display = 'block';
  displayUpdate = 'none';

  displayModal = 'none';

  successMessage = '';
  failureMessage = '';

  searchItem: string;

  constructor(private datePipe: DatePipe, private projectSvc: ProjectService, private userSvc: UserService,
    private taskSvc: TaskService) { }

  ngOnInit() {
    this.retreiveAllProjects();
  }

  setDates() {
    this.enableDate = !this.enableDate;
    if (this.enableDate) {
      this.notAllowDates = false;
      this.project.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.project.endDate = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
      this.dateType = 'date';
    } else {
      this.notAllowDates = true;
      this.project.startDate = '';
      this.project.endDate = '';
      this.dateType = 'text';
    }
  }

  onReset() {
    this.projForm.reset();
    this.dateType = 'text';
  }

  onUpdate(project: Project) {
    this.project.userID = parseInt(this.user.userID, 10);
    this.updateProject(this.project);
    this.onReset();
    this.display = 'block';
    this.displayUpdate = 'none';
  }

  onSubmit() {

  }

  onAdd() {
    this.project.userID = parseInt(this.user.userID, 10);
    console.log(this.project);
    this.addProject(this.project);
  }

  onDateChange() {
    if (this.project.startDate > this.project.endDate) {
      this.datesValid = false;
    } else {
      this.datesValid = true;
    }
  }

  selectedUser(user: User, event: Event) {
    event.preventDefault();
    console.log(user.userID);
    this.user.fName = user.fName;
    this.user.lName = user.lName;
    this.user.userID = user.userID;
    console.log(this.user.userID);
  }

  onSuspend(project: Project) {
    this.deleteProject(project);
  }

  openModal() {
    this.displayModal = 'block';
    this.searchItem = '';
    this.user = new User();
    this.retriveAllUsers();
  }

  closeModal() {
    this.displayModal = 'none';
  }

  select() {
    this.searchItem = this.user.fName + ' ' + this.user.lName;
    this.displayModal = 'none';
  }

  onEditProject(project: Project) {
    this.display = 'none';
    this.displayUpdate = 'block';
    this.project.endDate = project.endDate;
    this.project.startDate = project.startDate;
    this.project.projName = project.projName;
    this.project.projID = project.projID;
    this.project.priority = project.priority;
    this.project.userID = project.userID;
  }

  retriveAllUsers() {
    this.userSvc.getUsers().subscribe(
      response => {
        for (const key in response) {
          if (key === 'users') {
            this.retrievedUsers = response[key];
            console.log(this.retrievedUsers);
          } else if (key === 'port') {
            console.log(response[key]);
          }
        }
      }
    );
  }

  sortByPriority() {
    this.retrievedProjects = this.retrievedProjects.sort((a, b) => (a.priority > b.priority) ? 1 : -1);
  }

  sortByCompletedTasks() {
    this.retrievedProjects = this.retrievedProjects.sort((a, b) => (a.noOfCompTasks > b.noOfCompTasks) ? 1 : -1);
  }

  sortByEndDate() {
    this.retrievedProjects = this.retrievedProjects.sort((a, b) => (a.endDate) > (b.endDate) ? 1 : -1);
  }

  sortByStartDate() {
    this.retrievedProjects = this.retrievedProjects.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1);
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
      }
    );
  }

  deleteProject(project: Project): void {
    this.projectSvc.deleteProject(project.projID).subscribe(
      resp => {
        this.retreiveAllProjects();
        this.successMessage = 'Project Deleted Successfully !';
      },
      error => this.failureMessage = 'Delete Project Failed. Try Again Later');
  }

  addProject(project: Project): void {
    this.projectSvc.addProject(project).subscribe(
      resp => {
        this.retreiveAllProjects();
        this.successMessage = 'Project added Successfully !';
      },
      error => this.failureMessage = 'Project addition Failed. Try Again Later');
  }

  updateProject(project: Project): void {
    this.projectSvc.updateProject(project).subscribe(
      resp => {
        this.retreiveAllProjects();
        this.successMessage = 'Project updated Successfully !';
      },
      error => this.failureMessage = 'Project update Failed. Try Again Later');
  }

}
