import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  complexForm: FormGroup;

  constructor(private authService:AuthService,
              private router:Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService
              ) { 
    this.user = {
      id: 1,
      username: '',
      password: '',
      email: '',
      firstname:'',
      lastname:'',
      skill:''
    };

    this.complexForm = formBuilder.group({
      'username': [null, Validators.required], 
      'password': [null, Validators.required],
    })
                
  }

  ngOnInit() {
    
  }

  login(){
    console.log(this.user.username, this.user.password)
    this.authService.login(this.user.username, this.user.password)
      .then( res => {    
          if(this.authService.isAdmin()){
            this.router.navigate(['/admin']);
          } else if (this.authService.isUser()){
            this.router.navigate(['/home']);
          }           
      })
      .catch(error => {
        this.toastr.error('Invalid username or password.');
      });
  }

}
