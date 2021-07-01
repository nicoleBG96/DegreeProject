import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChildMedicalRecordService } from '../../../shared/services/child-medical-record.service';

import { ChildMedicalRecordModel } from '../../../shared/models/child-medical-record.model';

@Component({
  selector: 'app-edit-medical-record',
  templateUrl: './edit-medical-record.component.html',
  styleUrls: ['./edit-medical-record.component.css']
})
export class EditMedicalRecordComponent implements OnInit {
  child: any;
  id: any;

  constructor(private childMedicalRecordService: ChildMedicalRecordService, private route: ActivatedRoute, private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.child = this.childMedicalRecordService.getCreatedObject();
    this.route.paramMap.subscribe((paramMap: any) => {
      this.id = (paramMap.params.id);
      this.childMedicalRecordService.getChildMedicalRecordbyId(this.id).then(child => this.child = child);
    });
    this.child.age = this.calculateAge();
    this.child.date = new Date();
    this.route.paramMap.subscribe((paramMap: any) => {
      this.id = (paramMap.params.id);
    });
  }

  updateMedicalRecord(event: any) {
    if (this.validate(event)) {
      this.childMedicalRecordService.updateChildMedicalRecord(this.id, event);
      this.router.navigate(['child/showMedicalRecordProfile/' + this.id]);
      this.toastrService.success('éxito al editar', 'ÉXITO');
    } else {
      this.toastrService.error('error al editar, existen campos vacíos', 'ERROR');
    }
  }

  calculateAge() {
    const today = new Date();
    const childBirth = new Date(this.child.birthDate);
    let age = today.getFullYear() - childBirth.getFullYear();
    const months = today.getMonth() - childBirth.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < childBirth.getDate())) {
      age--;
    }
    return age;
  }

  validate(event: any) {
    let correct = true;
    const childMedical = new ChildMedicalRecordModel();
    childMedical.firstName = event.firstName;
    childMedical.lastName = event.lastName;
    childMedical.mothersLastName = event.mothersLastName;
    childMedical.sex = event.sex;
    childMedical.age = this.calculateAge();
    childMedical.date = new Date();
    childMedical.address = event.address;
    childMedical.description = event.description;
    if (childMedical.firstName === '' || childMedical.lastName === '' || childMedical.mothersLastName === '' ||
      childMedical.sex === '' || childMedical.age === null || childMedical.date === null || childMedical.address === ''
      || childMedical === undefined || childMedical.description === null || childMedical.description === undefined) {
      correct = false;
    } else {
      correct = true;
    }
    return correct;
  }
}
