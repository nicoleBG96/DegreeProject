import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { RegisterUserComponent } from './register-user/register-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {path: 'createUser', component: RegisterUserComponent },
  {path: 'editUser', component: EditUserComponent },
  {path: 'userList', component: UserListComponent },
  {path: 'user/:id', component: UserDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }
