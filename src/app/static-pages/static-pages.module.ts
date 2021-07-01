import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticPagesRoutingModule } from './static-pages-routing.module';

import { MaterialModule } from '../material-module/material-module.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    StaticPagesRoutingModule,
    MaterialModule
  ]
})
export class StaticPagesModule { }
