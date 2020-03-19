import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  retrievedUsers: User[] = [];

  @ViewChild('f', { static: false }) userForm: NgForm;

  public user: User = new User();

  display = 'block';
  displayUpdate = 'none';

  successMessage = '';
  failureMessage = '';


  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.retriveAllUsers();
  }

  onEditUser(user: User) {
    this.user.fName = user.fName;
    this.user.lName = user.lName;
    this.user.empID = user.empID;
    this.user.userID = user.userID;
    this.display = 'none';
    this.displayUpdate = 'block';
  }

  onUpdate(user: User) {
    this.updateUser(user);
    this.onReset();
    this.display = 'block';
    this.displayUpdate = 'none';
  }

  onAdd(user: User) {
    this.addUser(user);
    this.onReset();
    this.display = 'block';
    this.displayUpdate = 'none';
  }

  sortByFirstName() {
    this.retrievedUsers = this.retrievedUsers.sort((a, b) => (a.fName > b.fName) ? 1 : -1);
  }

  sortByLastName() {
    this.retrievedUsers = this.retrievedUsers.sort((a, b) => (a.lName > b.lName) ? 1 : -1);
  }

  sortByEmpId() {
    this.retrievedUsers = this.retrievedUsers.sort((a, b) => (a.empID) > (b.empID) ? 1 : -1);
  }

  onReset() {
    this.userForm.reset();
  }

  onSubmit() {

  }

  onDelete(user: User) {
    this.deleteUser(user);
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

  deleteUser(user: User): void {
    this.userSvc.deleteUser(user.userID).subscribe(
      resp => {
        this.retriveAllUsers();
        this.successMessage = 'User Deleted Successfully !';
      },
      error => this.failureMessage = 'Delete User Failed. Try Again Later');
  }

  updateUser(user: User): void {
    this.userSvc.updateUser(user).subscribe(
      resp => {
        this.retriveAllUsers();
        this.successMessage = 'User updated Successfully !';
      },
      error => this.failureMessage = 'User update Failed. Try Again Later');
  }

  addUser(user: User): void {
    this.userSvc.addUser(user).subscribe(
      resp => {
        this.retriveAllUsers();
        this.successMessage = 'User added Successfully !';
      },
      error => this.failureMessage = 'User add Failed. Try Again Later');
  }

}
