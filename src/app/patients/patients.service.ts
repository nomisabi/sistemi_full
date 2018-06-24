import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { User } from '../models/user';
import { MedicalExamination } from '../models/medical-examination';
import { Diagnosis } from '../models/diagnosis';
import { Medicine } from '../models/medicine';
import { Symptom } from '../models/symptom';
import { Disease } from '../models/disease';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  headers: HttpHeaders = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token'),'Content-Type':'application/json'});
 
  private authUrl = '/api/login';
  private roles: string[];

  constructor(private http: HttpClient,
              private router: Router) { }


  searchBySymptons(symptoms:Symptom[]):Promise<Disease[]>{
    const url = `/api/symptoms/disease`;
      return this.http.post<Symptom[]>(url, symptoms, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  searchByDisease(id:number):Promise<Symptom[]>{
    const url = `/api/disease/`+id+`/symptoms`;
      return this.http.get<Symptom[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  getUser():Promise<User>{
    const url = `/api/users/me`;
      return this.http.get<User>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }
  getPatient(id:number):Promise<Patient[]>{
    const url = `/api/user/`+id+`/patients`;
      return this.http.get<Patient[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  healPatient(id:number):Promise<MedicalExamination>{
    const url = `/api/examinations/`+id+`/heal`;
      return this.http.put<MedicalExamination>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  getExaminations(id:number):Promise<MedicalExamination[]>{
    const url = `/api/user/`+id+`/examinations`;
      return this.http.get<MedicalExamination[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  getReport1():Promise<Patient[]>{
    const url = `/api/report/1`;
      return this.http.get<Patient[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  getReport2():Promise<Patient[]>{
    const url = `/api/report/2`;
      return this.http.get<Patient[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  getReport3():Promise<Patient[]>{
    const url = `/api/report/3`;
      return this.http.get<Patient[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }



  getPatientWihoutDoctor():Promise<Patient[]>{
    const url = `/api/patients/no_dr`;
      return this.http.get<Patient[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  setDoctorToPatient(id_u:number, id:number):Promise<Patient[]>{
    const url = `/api/user/`+id_u+`/patients/`+id;
      return this.http.put<Patient[]>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  newPatient(id:number, patient:Patient):Promise<Patient>{
    const url = `/api/user/`+id+`/patients`;
      return this.http.post<Patient>(url, patient, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  newDiagnosis(id:number, diagnosis:Diagnosis):Promise<Diagnosis>{
    const url = `/api/examinations/`+id+`/diagnosis`;
      return this.http.post<Diagnosis>(url, diagnosis, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  newExamination(id:number, examination:MedicalExamination):Promise<MedicalExamination>{
    const url = `/api/patients/`+id+`/examinations`;
      return this.http.post<MedicalExamination>(url, examination, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  startResoner(examination:MedicalExamination):Promise<Disease>{
    const url = `/api/resoner`;
      return this.http.post<MedicalExamination>(url, examination, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  deletePatient(id:Number):Promise<Patient>{
    const url = `/api/patients/`+id;
      return this.http.delete<Patient>(url, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }

  check(id:number, medicines:Medicine[]):Promise<Medicine[]>{
    const url = `/api/patients/`+id+`/allergy`;
      return this.http.post<Medicine[]>(url, medicines, {headers: this.headers})
            .toPromise()
            .then(res => {return res})
            .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
}
}
