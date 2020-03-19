import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../tasks/task.service';
import { Task } from '../tasks/task.model';
import { ProjectService } from '../projects/project.service';
import { Project } from '../projects/project.model';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import { ParentTask } from '../tasks/parentTask.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  retrievesuccessMessage = '';
  retrievefailureMessage = '';
  constructor(private route: ActivatedRoute, private taskSvc: TaskService,
    private projectSvc: ProjectService, private userSvc: UserService) { }
  task: Task = new Task();
  project: Project = new Project();
  user: User = new User();
  ptask: ParentTask = new ParentTask();
  searchProjItem = '';
  displayPTaskModal = 'none';
  retrievedPTasks: ParentTask[] = [];
  public pTaskSelected = new ParentTask();
  searchUserItem = '';
  datesValid = true;
  status = '';

  updateSuccessMessage = '';
  updateFailureMessage = '';

  searchPTaskItem = '';

  ngOnInit() {
    this.retrieveTask(this.route.snapshot.params['tid']);
    this.retrieveUser(this.route.snapshot.params['uid']);
    this.retrieveProject(this.route.snapshot.params['pid']);
    this.retrievePTask(this.route.snapshot.params['ptid']);
  }

  retrieveTask(tid: string) {
    this.taskSvc.getTask(tid).subscribe(
      resp => {
        this.task = resp;
        this.retrievesuccessMessage = 'Task retrieved Successfully !';
      },
      error => this.retrievefailureMessage = 'Task retrieval Failed. Try Again Later');
  }

  onDateChange() {
    if (this.task.startDate > this.task.endDate) {
      this.datesValid = false;
    } else {
      this.datesValid = true;
    }
  }

  retrievePTask(ptid: number) {
    this.taskSvc.getPTask(ptid).subscribe(
      resp => {
        this.ptask = resp;
        console.log('FFDS');
        console.log(resp);
        this.searchPTaskItem = this.ptask.taskName;
        this.retrievesuccessMessage = 'Parent Task retrieved Successfully !';
      },
      error => this.retrievefailureMessage = 'Parent Task retrieval Failed. Try Again Later');
  }

  retrieveProject(pid: number) {
    this.projectSvc.getProject(pid).subscribe(
      resp => {
        this.project = resp;
        this.searchProjItem = this.project.projName;
        this.retrievesuccessMessage = 'Project retrieved Successfully !';
      },
      error => this.retrievefailureMessage = 'Project retrieval Failed. Try Again Later');
  }

  retrieveUser(uid: number) {
    this.userSvc.getUser(uid).subscribe(
      resp => {
        this.user = resp;
        this.searchUserItem = this.user.fName + ' ' + this.user.lName;
        this.retrievesuccessMessage = 'User retrieved Successfully !';
      },
      error => this.retrievefailureMessage = 'User retrieval Failed. Try Again Later');
  }

  openParentTaskModal() {
    this.displayPTaskModal = 'block';
    this.searchPTaskItem = '';
    this.retreiveAllPTask();
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

  selectedPTask(task: ParentTask, event: Event) {
    event.preventDefault();
    this.searchPTaskItem = task.taskName;
    this.pTaskSelected = task;
    this.task.parentTaskID = this.pTaskSelected.parentTaskID;
  }

  selectPTaskModal() {
    this.displayPTaskModal = 'none';
  }

  closePTaskModal() {
    this.displayPTaskModal = 'none';
  }

  onUpdate() {
    if (!this.searchPTaskItem) {
      this.task.parentTaskID = 0;
    }
    this.onUpdateProject(this.task);
  }

  onUpdateProject(task: Task): void {
    this.taskSvc.updateTask(task).subscribe(
      resp => {
        this.status = 'Project updated Successfully !';
      },
      error => this.status = 'Project update Failed. Try Again Later');
  }


}
