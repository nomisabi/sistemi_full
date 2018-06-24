import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../home/user.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {
  username: string = '';
  active=1;

  constructor(private authService: AuthService, private router:Router,
  private userService: UserService) {
   }

  ngOnInit() {
    this.username = this.authService.getCurrentUser();
    this.goToTab(1);
  }

  goToTab(id){

    if (id==1){

    }
    if (id==2){ //betegsegek
    
    }
    if (id==3){

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
