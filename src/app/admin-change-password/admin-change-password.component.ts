import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { AdminServiceService } from '../home-admin/admin-service.service';
import { UserPassword } from '../models/user-password';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {

  username: string = '';
  user: UserPassword;

  constructor(private authService: AuthService, private router:Router,
  private adminService: AdminServiceService) {
    this.user={
      currentPassword:'',
      newPassword1:''
      , newPassword2:''
    }
   }

  ngOnInit() {
    this.username = this.authService.getCurrentUser();
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
    this.adminService.changePassword(this.user).
    then(res=>this.router.navigate(['/admin'])).catch(res=> console.log('error'))
  }
}
