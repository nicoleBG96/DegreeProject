import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

// Routing
import { ChildRoutingModule } from './child-routing.module';

// Design
import { MaterialModule } from '../material-module/material-module.module';

// Components
import { ChildRegisterComponent } from './register/child-register/child-register.component';
import { ChildRegisterFormComponent } from './forms/child-register-form/child-register-form.component';
import { ChildMedicalRecordFormComponent } from './forms/child-medical-record-form/child-medical-record-form.component';
import { ChildProgressFormComponent } from './forms/child-progress-form/child-progress-form.component';
import { ChildsComponent } from './interfaces/childs/childs.component';
import { ShowRegisterFormComponent } from './register/show-register-form/show-register-form.component';
import { ShowMedicalRecordFormComponent } from './medicalRecord/show-medical-record-form/show-medical-record-form.component';
import { ShowProgressProfileComponent } from './progress/show-progress-profile/show-progress-profile.component';
import { EditRegisterChildComponent } from './register/edit-register-child/edit-register-child.component';
import { EditMedicalRecordComponent } from './medicalRecord/edit-medical-record/edit-medical-record.component';
import { EditProgressComponent } from './progress/edit-progress/edit-progress.component';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';

import {FilterPipe} from '../pipes/filter.pipe';

@NgModule({
  declarations: [
    ChildRegisterComponent,
    ChildRegisterFormComponent,
    ChildMedicalRecordFormComponent,
    ChildProgressFormComponent,
    ChildsComponent,
    ShowRegisterFormComponent,
    ShowMedicalRecordFormComponent,
    ShowProgressProfileComponent,
    EditRegisterChildComponent,
    EditMedicalRecordComponent,
    EditProgressComponent,
    ShowProfileComponent,
    ProfileListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ChildRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    ChildRegisterComponent,
    ChildRegisterFormComponent,
    ChildMedicalRecordFormComponent,
    ChildProgressFormComponent,
    ChildsComponent,
    ShowRegisterFormComponent,
    ShowMedicalRecordFormComponent,
    ShowProgressProfileComponent,
    EditRegisterChildComponent,
    EditMedicalRecordComponent,
    EditProgressComponent,
    ShowProfileComponent,
    ProfileListComponent,
    FilterPipe
  ]
})
export class ChildModule { }
