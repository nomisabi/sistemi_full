import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, UserRegister } from '../models/user';
import { UserPassword } from '../models/user-password';
import { Medicine } from '../models/medicine';
import { Ingredient } from '../models/ingredient';
import { Disease } from '../models/disease';
import { Symptom } from '../models/symptom';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
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

  getUsers():Promise<User[]>{
    const url = `/api/users`;
      return this.http.get<User[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  newUser(user:UserRegister):Promise<User>{
    const url = `/api/register`;
      return this.http.post<UserRegister>(url, user, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  deleteUser(id:Number):Promise<User>{
    const url = `/api/users/`+id;
      return this.http.delete<User>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }


  getMedicines():Promise<Medicine[]>{
    const url = `/api/medicines`;
      return this.http.get<Medicine[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  newMedicine(m:Medicine):Promise<Medicine>{
    const url = `/api/medicines`;
      return this.http.post<Medicine>(url, m, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  deleteMedicine(id:Number):Promise<Medicine>{
    const url = `/api/medicines/`+id;
      return this.http.delete<Medicine>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  getDiseases():Promise<Disease[]>{
    const url = `/api/diseases`;
      return this.http.get<Disease[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  newDisease(m:Disease):Promise<Disease>{
    const url = `/api/diseases`;
      return this.http.post<Disease>(url, m, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  deleteDisease(id:Number):Promise<Disease>{
    const url = `/api/diseases/`+id;
      return this.http.delete<Disease>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  getSymptom():Promise<Symptom[]>{
    const url = `/api/symptoms`;
      return this.http.get<Symptom[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  newSymptom(m:Symptom):Promise<Symptom>{
    const url = `/api/symptoms`;
      return this.http.post<Symptom>(url, m, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  deleteSymptom(id:Number):Promise<Symptom>{
    const url = `/api/symptoms/`+id;
      return this.http.delete<Symptom>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  getIngredients():Promise<Ingredient[]>{
    const url = `/api/ingredients`;
      return this.http.get<Ingredient[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  newIngredient(i:Ingredient):Promise<Ingredient>{
    const url = `/api/ingredients`;
      return this.http.post<Ingredient>(url, i, {headers: this.headers})
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