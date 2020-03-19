import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectPipe } from './projects/project.pipe';
import { UserPipe } from './users/user.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './add-task/add-task.component';
import { ParentTaskPipe } from './tasks/parentTask.pipe';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    ProjectsComponent,
    TasksComponent,
    ProjectPipe,
    UserPipe,
    ParentTaskPipe,
    AddTaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
