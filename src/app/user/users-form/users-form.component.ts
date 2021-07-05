import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Model
import { UserModel } from '../../shared/models/user.model';

// Service
import { UserService } from '../../shared/services/user.service';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  public myForm: FormGroup;
  @Input() public user: UserModel;
  @Output() public onSubmit: EventEmitter<any>;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.onSubmit = new EventEmitter <any>();
  }

  ngOnInit() {
    this.user = new UserModel();
  }

  public saveUser(): void {
    this.onSubmit.emit(this.user);
  }

  public goToLogin(): void {
    this.router.navigate(['auth/login']);
  }

}
