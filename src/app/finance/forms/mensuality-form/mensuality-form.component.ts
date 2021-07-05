import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MensualityService } from '../../../shared/services/mensuality.service';
import { ProfileService } from '../../../shared/services/profile.service';

import { MensualityModel } from '../../../shared/models/mensuality.model';

@Component({
  selector: 'app-mensuality-form',
  templateUrl: './mensuality-form.component.html',
  styleUrls: ['./mensuality-form.component.css']
})
export class MensualityFormComponent implements OnInit {
  public myForm: FormGroup;

  @Input() public mensuality: MensualityModel;
  @Output() public onSubmit: EventEmitter<any>;

  constructor(private mensualityService: MensualityService, private formBuilder: FormBuilder, 
    private profileService: ProfileService, private router: Router) {
    this.onSubmit = new EventEmitter<any>();
  }

  ngOnInit() {
    this.mensuality = new MensualityModel();
    const childKey = this.mensualityService.getChildKey();
    let child: any;
    this.mensuality.date = new Date();
    this.profileService.getProfilebyId(childKey).then((profile: any) => {
      child = profile;
      this.mensuality = profile;
      this.mensuality.type = 'mensuality';
      this.mensuality.childKey = childKey;
    });
  }

  public saveMensuality(): void {
    this.onSubmit.emit(this.mensuality);
  }

  public goToProfile(): void {
    const childKey = this.mensualityService.getChildKey();
    this.router.navigate(['finances/showMensuality']);
  }
}
