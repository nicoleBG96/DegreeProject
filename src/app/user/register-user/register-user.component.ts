import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Model
import { UserModel } from '../../shared/models/user.model';

// Services
import { UserService } from '../../shared/services/user.service';
import { AuthentificationService } from '../../authentification/authentification.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private authService: AuthentificationService, private userService: UserService, 
    private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  register(user: UserModel) {
    if (this.validateUser(user)) {
      this.userService.createUser(user);
      this.authService.register(user);
      this.router.navigate(['auth/login']);
      this.toastrService.success('exito al registrar', 'ÉXITO');
    } else {
      this.toastrService.error('error al registrar, existen campos vacios', 'ERROR');
    }
  }

  validateUser(user: any) {
    let correct = true;
    if (user.firstName === '' || user.lastName === '' || user.email === '' || user.password === '' || user.position === '')
      correct = false;
    return correct
  }

}
