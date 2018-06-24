import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { AdminServiceService } from './admin-service.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  username: string = '';
  user: User;

  constructor(private authService: AuthService, private router:Router,
  private adminService: AdminServiceService) {
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
    this.adminService.getUser().then(
      res=>this.user=res
    )
  }

  logout(){
    this.authService.logout();
  }

  goToHome(){
    this.router.navigate(['/admin']);
  }

  goToAdmin(){
    this.router.navigate(['/admin/admin']);
  }

  goToPass(){
    this.router.navigate(['/admin/password']);
  }

  update(){
    this.adminService.updateUser(this.user).then(res=>console.log('ok')).catch(res=> console.log('error'))
  }
}
