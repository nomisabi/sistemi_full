import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { PatientsService } from './patients.service';
import { User } from '../models/user';
import { Patient } from '../models/patient';
import { AdminServiceService } from '../home-admin/admin-service.service';
import { Medicine } from '../models/medicine';
import { Ingredient } from '../models/ingredient';
import { Allergy } from '../models/allergy';
import { MedicalExamination } from '../models/medical-examination';
import { Symptom } from '../models/symptom';
import { SymptomForExamination } from '../models/symptom-for-examination';
import { Disease } from '../models/disease';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  username: string = '';
  active=1;
  user:User={id:0, username:'',skill:'', password:'', lastname:'', firstname:'', email:''};
  patients:Patient[]=[];
  patients_dr:Patient[]=[];
  medicines:Medicine[]=[];
  ingredients: Ingredient[]=[];
  patient:Patient={id:0,lastName:'',firstName:'', examinations:[],listOfAllergy:[]}
  selectedIngredient:Ingredient={id:0,name:''}
  selectedMedicine:Medicine={name:'',id:0,ingredients:[],category:''}
  selectedPatient:Patient={id:0,lastName:'',firstName:'', examinations:[],listOfAllergy:[]}
  examinations:MedicalExamination[]=[];
  examination:MedicalExamination={id:0,diagnosis:null,doctor:null, patient:null, sympom:[], temperature:0};
  symptoms:Symptom[]=[];
  diseases: Disease[]=[]


  constructor(private authService: AuthService, private router:Router, 
    private patientService:PatientsService, private adminSerice: AdminServiceService, private toastr: ToastrService) {
   }

  ngOnInit() {
    this.patientService.getUser().then(res=>{this.user=res;console.log('user'+JSON.stringify(res)); this.goToTab(1);})
    this.username = this.authService.getCurrentUser();  
    
  }

  goToTab(id){

    if (id==1){
      this.patientService.getPatient(this.user.id).then(res=>{this.patients=res;console.log(res)})
    }
    if (id==2){ //new patient
      this.patientService.getExaminations(this.user.id).then(res=>{this.examinations=res;console.log(res)})
    }
    if (id==3){
      this.adminSerice.getMedicines().then(
        res=>{this.medicines=res;
        this.adminSerice.getIngredients().then(
          res=>this.ingredients=res
        )
        });
        this.patientService.getPatientWihoutDoctor().then(res=>{this.patients_dr=res; console.log(res)});
    }
    if (id==4){
      this.examination={id:0, diagnosis:null,doctor:this.user, patient:null,sympom:[],temperature:0}
      this.adminSerice.getSymptom().then(
        res=>{this.examination.sympom=[];
          this.symptoms=res;
          for (let s of this.symptoms){
            if (!s.specific){
              let sym:SymptomForExamination= {value:false, id:0,symptom:s}
              this.examination.sympom.push(sym)
            }
          }
        });
       // this.patientService.getPatientWihoutDoctor().then(res=>{this.patients_dr=res; console.log(res)});
    }
    if (id==5){
      this.adminSerice.getDiseases().then(
        res=>{this.diseases=res;
          this.adminSerice.getMedicines().then(
            res=>this.medicines=res
          )})
    }
    if (id==6){
      this.examination.diagnosis={medicines:[],id:0,disease:null,dateOfDiagnosis:new Date,operation:false, dateOfHealing:null, healed:false}
    }

    if (id==7){
      this.patientService.startResoner(this.examination).then(res=>
      {
        this.examination.diagnosis={medicines:[],id:0,disease:res,dateOfDiagnosis:new Date,operation:false, dateOfHealing:null, healed:false}
      })
    }
    this.active=id
  }

  check(){
    this.patientService.check(this.examination.patient.id, this.examination.diagnosis.medicines)
      .then(res=>{
        let med:Medicine[]=res
        if (med.length==0)
          this.toastr.success('There is no allergetic medicine');
        else{
          let s:String="";
          for (let m of med){
            s=s+m.name+", "
          }
          this.toastr.error('There are some allergetic medicine: '+ s);
        }
        console.log(res)}
    );
  }

  saveDiagnosis(){
    if (this.examination.diagnosis.disease.id==0){
      this.toastr.error('You have to choose a disease.');
      return;}

    this.patientService.newDiagnosis(this.examination.id, this.examination.diagnosis).then(
      res=>{this.examination={id:0,diagnosis:null,doctor:null, patient:null, sympom:[], temperature:0};
      this.goToTab(2);}
  
    )
  }

  removeMed(rem:Medicine){
    var index = this.examination.diagnosis.medicines.indexOf(rem, 0);
      if (index > -1) {
        this.examination.diagnosis.medicines.splice(index, 1);
      }
      this.medicines.push(rem);
  }

  add(){
    if (this.selectedMedicine.id==0)
      return;
    this.examination.diagnosis.medicines.push(this.selectedMedicine)
    var index = this.medicines.indexOf(this.selectedMedicine, 0);
      if (index > -1) {
        this.medicines.splice(index, 1);
      }
    this.selectedMedicine={
      id:0, name:'', category:'',ingredients:[]
    }
  }

  heal(examination:MedicalExamination){
    this.patientService.healPatient(examination.id).then(res=> this.goToTab(2));
  }

  saveEx(){
    if (this.examination.patient.id==0){
      this.toastr.error('You have to choose a patient.');
      return;

    }
    this.examination.doctor=this.user;
    this.patientService.newExamination(this.examination.patient.id, this.examination).then(
        res=>{this.examination=res;
        this.goToTab(5);
    }
    )
  }

  diagnos(ex:MedicalExamination){
    this.examination=ex;
    this.goToTab(5)
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

  addPat(){
    if (this.selectedPatient.id==0){
      this.toastr.error('You have to choose a patient.');
      return;
    }
    this.patientService.setDoctorToPatient(this.user.id, this.selectedPatient.id).then(
      res=>{this.patients_dr=res;
        this.selectedPatient={id:0,lastName:'',firstName:'', examinations:[],listOfAllergy:[]}
        this.goToTab(1);
      });
  }

  addMedicine(){
    if (this.selectedMedicine.id!=0){
      let allergy:Allergy={id:0, medicine:this.selectedMedicine, ingredient:null}
      this.patient.listOfAllergy.push(allergy)
      var index = this.medicines.indexOf(this.selectedMedicine, 0);
        if (index > -1) {
          this.medicines.splice(index, 1);
        }
      this.selectedMedicine={name:'',id:0,ingredients:[],category:''}
    }
  }

  addIgn(){
    let allergy:Allergy={id:0, medicine:null, ingredient:this.selectedIngredient}
    this.patient.listOfAllergy.push(allergy)
    var index = this.ingredients.indexOf(this.selectedIngredient, 0);
      if (index > -1) {
        this.ingredients.splice(index, 1);
      }
    this.selectedIngredient={id:0,name:''};

  }

  remove(rem:Allergy){
    var index = this.patient.listOfAllergy.indexOf(rem, 0);
      if (index > -1) {
        this.patient.listOfAllergy.splice(index, 1);
      }
      if (rem.ingredient!=null)
        this.ingredients.push(rem.ingredient);
      if (rem.medicine!=null)
        this.medicines.push(rem.medicine);
  }
  savePatient(){
    this.patientService.newPatient(this.user.id, this.patient).then(res=> 
      {this.patient={id:0,lastName:'',firstName:'', examinations:[],listOfAllergy:[]}
      this.goToTab(1);
    })
  }

  deletePatient(patient:Patient){
    this.patientService.deletePatient(patient.id).then(res=>this.ngOnInit())
  }
}
