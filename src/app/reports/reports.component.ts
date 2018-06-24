import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../home/user.service';
import { Patient } from '../models/patient';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  username: string = '';
  active=1;
  patients_1:Patient[]=[];
  patients_2:Patient[]=[];
  patients_3:Patient[]=[];

  constructor(private authService: AuthService, private router:Router,
  private patientService:PatientsService) {
   }

  ngOnInit() {
    this.username = this.authService.getCurrentUser();
    this.goToTab(1);
  }

  goToTab(id){

    if (id==1){
      this.patientService.getReport1().then(res=>this.patients_1=res)
    }
    if (id==2){ //betegsegek
      this.patientService.getReport2().then(res=>this.patients_2=res)
    }
    if (id==3){
      this.patientService.getReport3().then(res=>this.patients_3=res)
    }

    this.active=id
  }

  logout(){
    this.authService.logout();
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
  goToDiseases(){
    this.router.navigate(['/diseases']);
  }

  goToPatients(){
    this.router.navigate(['/patients']);
  }

  goToMonitoring(){
    this.router.navigate(['/monitoring']);
  }

  goToReports(){
    this.router.navigate(['/reports']);
  }

}
