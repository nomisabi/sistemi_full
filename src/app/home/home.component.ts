import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';
  user: User;

  constructor(private authService: AuthService, private router:Router,
  private userService: UserService) {
    this.user={
      email:'',
      firstname:'',
      id:0,
      lastname:'',
      password:'',
      skill:'',
      username:'' 
    }
   }

  ngOnInit() {
    this.username = this.authService.getCurrentUser();
    this.userService.getUser().then(
      res=>this.user=res
    )
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
  goToPass(){
    this.router.navigate(['/password']);
  }

  update(){
    this.userService.updateUser(this.user).then(res=>console.log('ok')).catch(res=> console.log('error'))
  }
}
