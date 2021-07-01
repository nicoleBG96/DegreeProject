import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

// Routing
import { AuthentificationRoutingModule } from './authentification-routing.module';

// Components
import { LoginComponent } from './login/login.component';

// Service
import { AuthentificationService } from './authentification.service';

// Design
import { MaterialModule } from '../material-module/material-module.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [AuthentificationService],
  exports: [LoginComponent]
})
export class AuthentificationModule { }
