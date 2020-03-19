import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseURI = 'http://localhost:8000/user/';
    constructor(private http: HttpClient) { }

    retrievedUsers: User[] = [];

    getUsers(): any {
        return this.http.get(this.baseURI + 'getusers');
    }

    deleteUser(userId: string): any {
        console.log('Service User Id - ' + userId);
        return this.http.delete(this.baseURI + 'deleteuser/' + userId);
    }

    updateUser(user: User): any {
        console.log('Service User Id - ' + user);
        return this.http.put(this.baseURI + 'updateuser/' + user.userID, user);
    }

    addUser(user: User): any {
        console.log('Service User Id - ' + user);
        return this.http.post(this.baseURI + 'adduser', user);
    }

    getUser(uid: number): any {
        return this.http.get(this.baseURI + 'getuser/' + uid);
    }

}
