import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Service
import { ChildRegisterService } from '../../../shared/services/child-register.service';
import { ChildMedicalRecordService } from '../../../shared/services/child-medical-record.service';
import { ChildProgressService } from '../../../shared/services/child-progress.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { MensualityService } from '../../../shared/services/mensuality.service';

// Model
import { ChildRegisterModel } from '../../../shared/models/child-register.model';
import { ChildMedicalRecordModel } from '../../../shared/models/child-medical-record.model';
import { ChildProgressModel } from '../../../shared/models/child-progress.model';
import { ProfileModel } from '../../../shared/models/profile.model';

@Component({
  selector: 'app-child-register',
  templateUrl: './child-register.component.html',
  styleUrls: ['./child-register.component.css']
})
export class ChildRegisterComponent implements OnInit {

  constructor(private childRegisterService: ChildRegisterService, private router: Router,
    private childMedicalRecordService: ChildMedicalRecordService, private childProgressService: ChildProgressService,
    private profileService: ProfileService, private toastrService: ToastrService,
    private mensualityService: MensualityService) { }

  ngOnInit() {
  }

  register(event: ChildRegisterModel) {
    console.log(event);
    if (this.validate(event)) {
      // tslint:disable-next-line:prefer-const
      const latestKey = this.childRegisterService.createChild(event);
      console.log(latestKey);

      this.childRegisterService.chargePhoto(event, latestKey);
      setTimeout(() => {
        this.createMedicalRecord(event, latestKey);
        this.createProgress(event, latestKey);
        this.createProfile(event, latestKey);
      }, 5000);
      this.childRegisterService.setCreatedObject(event);
      this.router.navigate(['child/showRegisterProfile/' + latestKey]);
      this.toastrService.success('exito al registrar', 'ÉXITO');
    } else {
      this.toastrService.error('error al registrar, existen campos vacios', 'ERROR');
    }
  }

  createMedicalRecord(event: any, latestKey: any) {
    // tslint:disable-next-line:prefer-const
    let medicalRecord = new ChildMedicalRecordModel();
    medicalRecord.firstName = event.firstName;
    medicalRecord.lastName = event.lastName;
    medicalRecord.mothersLastName = event.mothersLastName;
    medicalRecord.sex = event.sex;
    medicalRecord.address = event.street;
    medicalRecord.birthDate = event.birthDate;
    this.childMedicalRecordService.createChildMedicalRecord(event, latestKey);
  }

  createProgress(event: any, latestKey: any) {
    // tslint:disable-next-line:prefer-const
    let progress = new ChildProgressModel();
    progress.firstName = event.firstName;
    progress.lastName = event.lastName;
    progress.mothersLastName = event.lastName;
    progress.size = event.size;
    progress.weight = event.weight;
    progress.sex = event.sex;
    this.childProgressService.createChildProgress(event, latestKey);
  }

  createProfile(event: any, latestKey: any) {
    // tslint:disable-next-line:prefer-const
    let profile = new ProfileModel();
    profile.firstName = event.firstName;
    profile.lastName = event.lastName;
    profile.mothersLastName = event.mothersLastName;
    profile.birthDate = event.birthDate;
    profile.sex = event.sex;
    profile.date = event.admissionDate;
    profile.isDisable = event.isDisable;
    profile.image = event.image;
    this.profileService.createProfile(event, latestKey);
  }

  validate(event: any) {
    let correct = true;
    if (event.firstName === '' || event.lastName === '' || event.mothersLastName === '' || event.admissionDate === null ||
      event.birthDate === null || event.sex === '' || event.size === '' || event.weight === '' || event.municipality === '' ||
      event.district === '' || event.zone === '' || event.street === '' || event.nameOfTutor === '' || event.phone === '' ||
      event.degreeOfInstruction === '' || event.activity === '') {
      correct = false;
    }
    return correct;
  }
}
