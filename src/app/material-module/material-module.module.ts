import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ScrollingModule
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ScrollingModule
  ]
})
export class MaterialModule { }
