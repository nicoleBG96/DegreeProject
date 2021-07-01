import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

// Routing
import { UserRoutingModule } from './user-routing.module';

// Service
import { AuthentificationService } from '../authentification/authentification.service';

// Components
import { RegisterUserComponent } from './register-user/register-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersFormComponent } from './users-form/users-form.component';

// Design
import { MaterialModule } from '../material-module/material-module.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    RegisterUserComponent,
    EditUserComponent,
    UsersFormComponent,
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    RegisterUserComponent,
    EditUserComponent,
    UsersFormComponent,
    UserListComponent,
    UserDetailComponent
  ],
  providers: [AuthentificationService]
})
export class UserModule { }
