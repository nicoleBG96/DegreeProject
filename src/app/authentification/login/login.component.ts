import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Service
import { AuthentificationService } from '../authentification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string;
  userList: any = [];
  user: any = {};
  loading = false;

  constructor(private authService: AuthentificationService, private router: Router, private fb: FormBuilder,
    private toastrService: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(value) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.authService.loginWhitEmail(value).then((res) => {
      window.location.replace('/');
    });
    }, 700);
    
  }

  createUser() {
    this.router.navigate(['users/createUser'])
  }
}
