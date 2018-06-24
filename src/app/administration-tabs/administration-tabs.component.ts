import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { User, UserRegister } from '../models/user';
import { AdminServiceService } from '../home-admin/admin-service.service';
import { Medicine } from '../models/medicine';
import { Ingredient } from '../models/ingredient';
import { Symptom } from '../models/symptom';
import { Disease } from '../models/disease';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administration-tabs',
  templateUrl: './administration-tabs.component.html',
  styleUrls: ['./administration-tabs.component.css']
})
export class AdministrationTabsComponent implements OnInit {

  username: string = '';
  active=1;
  users:User[]=[];
  user:UserRegister={
    email:'',
    firstname:'',
    lastname:'',
    password:'',
    password2:'',
    skill:'',
    username:''
  }
  medicines:Medicine[]=[]
  medicine:Medicine={
    category:'ANTIBIOTICS',
    id:0,
    ingredients:[],
    name:''
  }
  
  ingredients:Ingredient[]=[]
  ingredient:Ingredient={
    id:0, name:''
  }
  selectedValue:Ingredient={
    id:0, name:''
  }
  symptoms:Symptom[]=[]
  symptom:Symptom={
    id:0, name:'', specific: false, days:0, symptomForSpecific:null, times:0
  }
  selectedSymptom:Symptom={
    id:0, name:'', specific: false, days:0, symptomForSpecific:null, times:0
  }
  selectedDisease:Disease={
    id:0, name:'', category:'FIRST',simptons:[], temperatureMax:0, temperatureMin:0
  }
  diseases:Disease[]=[]
  disease:Disease={
    id:0, name:'', category:'FIRST',simptons:[], temperatureMax:0, temperatureMin:0
  }


  constructor(private authService: AuthService, private router:Router, private adminService: AdminServiceService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.username = this.authService.getCurrentUser();
    this.adminService.getUsers().then(res=> 
      {this.users=res; console.log(this.users)})
  }

  logout(){
    this.authService.logout();
  }

  goToTab(id){
    console.log(id)
    if (id==1){
      this.adminService.getUsers().then(res=> 
        {this.users=res; console.log(this.users)})
    }
    if (id==2){ //betegsegek
      this.adminService.getDiseases().then(res=> 
        {this.diseases=res; console.log(this.diseases)})
    }
    if (id==3){
      this.adminService.getMedicines().then(res=> 
        {this.medicines=res; console.log(this.medicines)})
    }
    //4 rules
    // 5 uj 
    if (id==6){
      this.adminService.getSymptom().then(res=> 
        {this.symptoms=res; console.log('ing: ',this.symptoms)})
    }
    if (id==7){
      this.adminService.getIngredients().then(res=> 
        {this.ingredients=res; console.log('ing: ',this.ingredients)})
    }
    this.active=id
  }


  goToHome(){
    this.router.navigate(['/admin']);
  }

  goToAdmin(){
    this.router.navigate(['/admin/admin']);
  }

  delete(user:User){
    this.adminService.deleteUser(user.id).then(res=>this.ngOnInit())
  }

  deleteMedicine(medicine:Medicine){
    this.adminService.deleteMedicine(medicine.id).then(res=>this.adminService.getMedicines().then(res=> 
      {this.medicines=res; console.log(this.medicines)}))
  }

  deleteDisease(disease:Disease){
    this.adminService.deleteDisease(disease.id).then(res=>this.adminService.getDiseases().then(res=> 
      {this.diseases=res; console.log(this.diseases)}))
  }

  save(){
    this.adminService.newUser(this.user).then(
      res=>{this.user={
        email:'',
        firstname:'',
        lastname:'',
        password:'',
        password2:'',
        skill:'',
        username:''
      };
      this.goToTab(1);
        
      })
  }

  saveMedicine(){
    this.adminService.newMedicine(this.medicine).then(res=> 
        {this.medicine={
          category:'ANTIBIOTICS',
          id:0,
          ingredients:[],
          name:''
        };
        this.goToTab(3);
      })
    
  }

  newIng(){
    this.adminService.newIngredient(this.ingredient).then(
      res=>
        {
          this.medicine.ingredients.push(this.ingredient)
          this.ingredient={ id:0, name:''};
      })
  }

  removeFromIng(rem:Ingredient){
    var index = this.medicine.ingredients.indexOf(rem, 0);
      if (index > -1) {
        this.medicine.ingredients.splice(index, 1);
      }
      this.ingredients.push(rem);
  }

  add(){
    this.medicine.ingredients.push(this.selectedValue)
    var index = this.ingredients.indexOf(this.selectedValue, 0);
      if (index > -1) {
        this.ingredients.splice(index, 1);
      }
    this.selectedValue={
      id:0, name:''
    }
  }

  saveDisease(){
    // symptom nubmers
    if (this.disease.category=='FIRST'){
      if (this.disease.simptons.length<4){
        this.toastr.error('Minimum 4 symptom is needed ');
      }
    }
    console.log(this.disease)
    this.adminService.newDisease(this.disease).then(res=> 
        {this.disease={
          id:0, name:'', category:'FIRST',simptons:[], temperatureMax:0, temperatureMin:0
 
        };
        this.goToTab(2);
      })
    
  }

  newSymptom(){
    // ellenrorizni specifiket
    //if (this.selectedDisease.name!='' && this.symptom.times!=0 && this.symptom.days!=0 && this.symptom.specific){
      //return;
   // }
    if (this.symptom.specific){
      this.symptom.symptomForSpecific=this.selectedDisease.name;
      this.selectedDisease={ id:0, name:'',simptons:[], temperatureMin:0, temperatureMax:0, category:''};
    }


    this.adminService.newSymptom(this.symptom).then(
      res=>
        {
          this.disease.simptons.push(this.symptom)
          this.symptom={ id:0, name:'', specific:false, days:0, symptomForSpecific:null, times:0};
      })
  }

  removeFromSymptom(rem:Symptom){
    var index = this.disease.simptons.indexOf(rem, 0);
      if (index > -1) {
        this.disease.simptons.splice(index, 1);
      }
      this.symptoms.push(rem);
  }

  addSymptom(){
    this.disease.simptons.push(this.selectedSymptom)
    var index = this.symptoms.indexOf(this.selectedSymptom, 0);
      if (index > -1) {
        this.symptoms.splice(index, 1);
      }
    this.selectedSymptom={ id:0, name:'', specific:false, days:0, symptomForSpecific:null, times:0};
  }
}
