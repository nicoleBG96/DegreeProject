import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
