import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { AdminServiceService } from '../home-admin/admin-service.service';
import { Disease } from '../models/disease';
import { Symptom } from '../models/symptom';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent implements OnInit {

  username: string = '';
  active=1;
  diseases:Disease[]=[];
  selectedSymptoms:Symptom[]=[]
  selectedSymptom:Symptom={id:0,name:'',specific:false,days:0,symptomForSpecific:null,times:0}
  symptoms:Symptom[]=[]
  symp_diseases:Disease[]=[]
  selectedDisease: Disease={name:'', id:0,category:'', simptons:[],temperatureMax:0,temperatureMin:0}
  dis_symptoms:Symptom[]=[]

  constructor(private authService: AuthService, private router:Router,
  private adminService: AdminServiceService, private patientService: PatientsService) {
   }

  ngOnInit() {
    this.username = this.authService.getCurrentUser();  
    this.goToTab(1);
  }

  goToTab(id){

    if (id==1){
      this.adminService.getDiseases().then(res=>this.diseases=res)
    }
    if (id==2){ //betegsegek
      this.adminService.getSymptom().then(res=>this.symptoms=res)
    }
    if (id==3){
      this.adminService.getDiseases().then(res=>this.diseases=res)
    }

    this.active=id
  }

  removeSymp(sym:Symptom){
    var index = this.selectedSymptoms.indexOf(sym, 0);
    if (index > -1) {
      this.selectedSymptoms.splice(index, 1);
    }
    this.symptoms.push(sym);
  }

  searchSymp(){
    this.patientService.searchBySymptons(this.selectedSymptoms).then(res=> {this.symp_diseases=res; console.log(res)})

  }

  searchDis(){
    this.patientService.searchByDisease(this.selectedDisease.id).then(res=> {this.dis_symptoms=res; console.log(res)})

  }
  add(){
    this.selectedSymptoms.push(this.selectedSymptom)
        var index = this.symptoms.indexOf(this.selectedSymptom, 0);
          if (index > -1) {
            this.symptoms.splice(index, 1);
          }
        this.selectedSymptom={id:0,name:'',specific:false,days:0,symptomForSpecific:null,times:0}
        
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
