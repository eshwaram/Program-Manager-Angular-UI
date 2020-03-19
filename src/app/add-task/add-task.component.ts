import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../projects/project.model';
import { User } from '../users/user.model';
import { ParentTask } from '../tasks/parentTask.model';
import { ProjectService } from '../projects/project.service';
import { Task } from '../tasks/task.model';
import { UserService } from '../users/user.service';
import { TaskService } from '../tasks/task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [DatePipe]
})
export class AddTaskComponent implements OnInit {
  parentcbox: boolean;
  displayProjectModal = 'none';
  displayUserModal = 'none';
  displayPTaskModal = 'none';
  searchProjItem: string;
  searchUserItem: string;
  searchPTaskItem: string;
  datesValid = true;

  successMessage = '';
  failureMessage = '';

  @ViewChild('f', { static: false }) taskForm: NgForm;

  public user: User = new User();

  public userSelected: User = new User();

  public pTaskSelected = new ParentTask();

  public task: Task = new Task();

  public project = new Project();

  retrievedProjects: Project[] = [];

  retrievedUsers: User[] = [];

  retrievedPTasks: ParentTask[] = [];

  constructor(private projectSvc: ProjectService, private userSvc: UserService,
              private taskSvc: TaskService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.task.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.task.endDate = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
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

  retrieveAllUsers() {
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


  retreiveAllPTask() {
    this.taskSvc.getPTasks().subscribe(
      response => {
        for (const key in response) {
          if (key === 'pTasks') {
            this.retrievedPTasks = response[key];
            console.log(this.retrievedPTasks);
          } else if (key === 'port') {
            console.log(response[key]);
          }
        }
      }
    );
  }

  onDateChange() {
    if (this.task.startDate > this.task.endDate) {
      this.datesValid = false;
    } else {
      this.datesValid = true;
    }
  }

  clickPTaskCBox() {
    this.parentcbox = !this.parentcbox;
  }

  onReset() {
    this.taskForm.reset();
  }

  onAdd() {
    if (this.parentcbox) {
      const parentTask = new ParentTask();
      parentTask.projID = this.project.projID;
      parentTask.taskName = this.task.taskName;
      parentTask.userID = parseInt(this.userSelected.userID, 10);
      this.addParentTask(parentTask);
    } else {
      this.task.parentTaskID = this.pTaskSelected.parentTaskID;
      this.task.userID = parseInt(this.userSelected.userID, 10);
      this.task.projID = this.project.projID;
      console.log(this.task);
      this.addTask(this.task);
    }
  }

  addParentTask(task: ParentTask): void {
    this.taskSvc.addParentTask(task).subscribe(
      resp => {
        this.retreiveAllProjects();
        this.successMessage = 'Parent Task added Successfully !';
      },
      error => this.failureMessage = 'Parent Task addition Failed. Try Again Later');
  }

  addTask(task: Task): void {
    this.taskSvc.addTask(task).subscribe(
      resp => {
        this.retreiveAllProjects();
        this.successMessage = 'Task added Successfully !';
      },
      error => this.failureMessage = 'Task addition Failed. Try Again Later');
  }

  selectedProject(project: Project, event: Event) {
    event.preventDefault();
    this.searchProjItem = project.projName;
    this.project = project;
    console.log(this.project);
  }

  selectedPTask(task: ParentTask, event: Event) {
    event.preventDefault();
    this.searchPTaskItem = task.taskName;
    this.pTaskSelected = task;
    console.log(this.pTaskSelected);
  }

  selectProjModal() {
    this.displayProjectModal = 'none';
  }

  selectPTaskModal() {
    this.displayPTaskModal = 'none';
  }

  selectUserModal() {
    this.displayUserModal = 'none';
  }

  openProjectModal() {
    this.displayProjectModal = 'block';
    this.searchProjItem = '';
    this.retreiveAllProjects();
  }

  openUserModal() {
    this.displayUserModal = 'block';
    this.searchUserItem = '';
    this.userSelected = new User();
    this.retrieveAllUsers();
  }

  openParentTaskModal() {
    this.displayPTaskModal = 'block';
    this.searchPTaskItem = '';
    this.retreiveAllPTask();
  }

  closeProjectModal() {
    this.displayProjectModal = 'none';
  }

  closeUserModal() {
    this.displayUserModal = 'none';
  }

  closePTaskModal() {
    this.displayPTaskModal = 'none';
  }

  selectedUser(user: User, event: Event) {
    event.preventDefault();
    console.log(user.userID);
    this.userSelected.fName = user.fName;
    this.userSelected.lName = user.lName;
    this.userSelected.userID = user.userID;
    this.searchUserItem = user.fName + ' ' + user.lName;
    console.log(this.userSelected.userID);
  }

}
