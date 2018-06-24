import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';
import { UserPassword } from '../../models/user-password';
import { UserService } from '../user.service';

@Component({
  selector: 'app-passport-change',
  templateUrl: './passport-change.component.html',
  styleUrls: ['./passport-change.component.css']
})
export class PassportChangeComponent implements OnInit {


  username: string = '';
  user: UserPassword;

  constructor(private authService: AuthService, private router:Router,
  private userService: UserService) {
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
    this.router.navigate(['/home']);
  }


  update(){
    this.userService.changePassword(this.user).
      then(res=>this.router.navigate(['/home'])).catch(res=> console.log('error'))
  }

}
