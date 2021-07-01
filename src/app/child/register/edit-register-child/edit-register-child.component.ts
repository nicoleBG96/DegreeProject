import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChildMedicalRecordService } from 'src/app/shared/services/child-medical-record.service';
import { ChildProgressService } from 'src/app/shared/services/child-progress.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

import { ChildRegisterService } from '../../../shared/services/child-register.service';


@Component({
  selector: 'app-edit-register-child',
  templateUrl: './edit-register-child.component.html',
  styleUrls: ['./edit-register-child.component.css']
})
export class EditRegisterChildComponent implements OnInit {
  child: any;
  id: any;

  constructor(private childRegisterService: ChildRegisterService, private router: Router, private route: ActivatedRoute,
    private toastrService: ToastrService, private childProgressService: ChildProgressService,
    private childMedicalRecordService: ChildMedicalRecordService, private profileService: ProfileService) { }

  ngOnInit() {
    this.child = this.childRegisterService.getCreatedObject();
    this.route.paramMap.subscribe((paramMap: any) => {
      this.id = (paramMap.params.id);
      this.childRegisterService.getChildbyId(this.id).then(child => this.child = child);
    });
  }

  update(event: any) {
    if (this.validate(event)) {
      this.childRegisterService.updateChild(this.id, event);
      this.childProgressService.updateChildProgress(this.id, event);
      this.childMedicalRecordService.updateChildMedicalRecord(this.id, event);
      this.profileService.updateProfile(this.id, event);
      this.router.navigate(['child/showRegisterProfile/' + this.id]);
      this.toastrService.success('éxito al editar', 'ÉXITO');
    } else {
      this.toastrService.error('error al editar, exiten campos vacíos', 'ERROR');
    }
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
