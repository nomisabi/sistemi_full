import { Injectable } from '@angular/core';
import { UserPassword } from '../models/user-password';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token'),'Content-Type':'application/json'});
 
  private authUrl = '/api/login';
  private roles: string[];

  constructor(private http: HttpClient,
              private router: Router) { }

  getUser():Promise<User>{
    const url = `/api/users/me`;
      return this.http.get<User>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }
  
  updateUser(updateUser: User):Promise<User>{
    const url = `/api/users`
      return this.http.put<User>(url, updateUser, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  changePassword(userPassword: UserPassword){
    const url = `/api/users/password`
      return this.http.put<UserPassword>(url, userPassword, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
}
}
