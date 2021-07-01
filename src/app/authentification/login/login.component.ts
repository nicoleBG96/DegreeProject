import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Service
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm: FormGroup;
  public errorMessage: string;
  public userList: any = [];
  public user: any = {};
  public loading = false;

  constructor(private authService: AuthentificationService, private router: Router, 
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    });
  }

  public login(loginForm: FormGroup): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.authService.loginWhitEmail(loginForm).then((res) => {
      window.location.replace('/');
    });
    }, 700);
    
  }

  public get email() {
    return this.loginForm.get('email');
  }

  public get password() {
    return this.loginForm.get('password');
  }


  public goToCreateUser(): void {
    this.router.navigate(['users/createUser'])
  }
}
