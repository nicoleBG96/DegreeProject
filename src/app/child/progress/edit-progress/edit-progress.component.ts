import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChildProgressService } from '../../../shared/services/child-progress.service';

import { ChildProgressModel } from '../../../shared/models/child-progress.model';

@Component({
  selector: 'app-edit-progress',
  templateUrl: './edit-progress.component.html',
  styleUrls: ['./edit-progress.component.css']
})
export class EditProgressComponent implements OnInit {
  child: any;
  id: any;

  constructor(private childProgressService: ChildProgressService, private router: Router, private route: ActivatedRoute,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.child = this.childProgressService.getCreatedObject();
    this.route.paramMap.subscribe((paramMap: any) => {
      this.id = (paramMap.params.id);
      this.childProgressService.getChildProgressbyId(this.id).then(child => this.child = child);
    });
    this.child.age = this.calculateAgeIntMonths();
    this.child.date = new Date();
    this.route.paramMap.subscribe((paramMap: any) => {
      this.id = (paramMap.params.id);
    });
  }

  updateProgress(event: any) {
    if (event.age === 0) {
      event.pointA2 = 0;
      event.pointA3 = 0;
      event.pointB2 = 0;
      event.pointB3 = 0;
      event.pointC2 = 0;
      event.pointC3 = 0;
      event.pointD2 = 0;
      event.pointD3 = 0;
    }
    if (this.validate(event)) {
      this.childProgressService.updateChildProgress(this.id, event);
      this.router.navigate(['child/showProgressProfile/' + this.id]);
      this.toastrService.success('exito al editar', 'ÉXITO');
    } else {
      this.toastrService.error('error al editar, existen campos vacíos', 'ERROR');
    }
  }

  calculateAgeIntMonths() {
    const today = new Date();
    const childBirth = new Date(this.child.birthDate);
    let months = (today.getFullYear() - childBirth.getFullYear()) * 12;
    months -= childBirth.getMonth() + 1;
    months += today.getMonth();
    return months;
  }

  validate(event: any) {
    let correct = true;
    const childProgress = new ChildProgressModel();
    childProgress.firstName = event.firstName;
    childProgress.lastName = event.lastName;
    childProgress.mothersLastName = event.mothersLastName;
    childProgress.size = event.size;
    childProgress.weight = event.weight;
    childProgress.sex = event.sex;
    childProgress.birthDate = event.birthDate;
    childProgress.date = new Date();
    childProgress.age = this.calculateAgeIntMonths();
    childProgress.folio = event.folio;
    childProgress.pointA1 = event.pointA1;
    childProgress.pointA2 = event.pointA2;
    childProgress.pointA3 = event.pointA3;
    childProgress.pointB1 = event.pointB1;
    childProgress.pointB2 = event.pointB2;
    childProgress.pointB3 = event.pointB3;
    childProgress.pointC1 = event.pointC1;
    childProgress.pointC2 = event.pointC2;
    childProgress.pointC3 = event.pointC3;
    childProgress.pointD1 = event.pointD1;
    childProgress.pointD2 = event.pointD2;
    childProgress.pointD3 = event.pointD3;
    childProgress.numberOrder = event.numberOrder;
    if (childProgress.firstName === '' || childProgress.lastName === '' || childProgress.mothersLastName === '' ||
      childProgress.birthDate === null || childProgress.sex === '' || childProgress.size === '' ||
      childProgress.weight === '' || childProgress.date === null || childProgress.age === null || childProgress.folio === ''
      || childProgress.numberOrder === '' || childProgress.numberOrder === undefined || childProgress.pointA1 === '' 
      || childProgress.pointA1 ===  undefined || childProgress.pointB1 === '' || childProgress.pointB1 === undefined
      || childProgress.pointC1 === '' || childProgress.pointC1 === undefined || childProgress.pointD1 === ''
      || childProgress.pointD1 === undefined || childProgress.pointA2 === '' || childProgress.pointA2 === undefined 
      ||  childProgress.pointB2 === '' ||  childProgress.pointB2 === undefined || childProgress.pointC2 === ''
      || childProgress.pointC2 === undefined || childProgress.pointD2 === '' || childProgress.pointD2 === undefined
      || childProgress.pointA3 === '' || childProgress.pointA3 === undefined || childProgress.pointB3 === ''
      || childProgress.pointB3 === undefined || childProgress.pointC3 === '' || childProgress.pointC3 === undefined
      || childProgress.pointD3 === '' || childProgress.pointD3 === undefined) {
        correct = false;
        } else {
        correct = true;
    }
    return correct;
  }
}
