import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Model
import { ChildProgressModel } from '../../../shared/models/child-progress.model';


@Component({
  selector: 'app-child-progress-form',
  templateUrl: './child-progress-form.component.html',
  styleUrls: ['./child-progress-form.component.css']
})
export class ChildProgressFormComponent implements OnInit {
  myForm: FormGroup;
  isEdit: boolean;
  id: any;
  @Input() child: ChildProgressModel;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmit: EventEmitter<any>;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onEdit: EventEmitter<any>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.onSubmit = new EventEmitter<any>();
    this.onEdit = new EventEmitter<any>();
   }

  ngOnInit() {
    if (!this.child) {
      this.child = new ChildProgressModel();
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  saveProgress() {
    this.onSubmit.emit(this.child);
  }

  editProgress(child: ChildProgressModel) {
    this.onEdit.emit(this.child);
  }

  calculateTotalPartial(point1: string, point2: string, point3: string) {
    if (point1 == null || point2 == null || point3 == null) {
      return 0;
    } else {
      return (parseInt(point1, 10) + parseInt(point2, 10) + parseInt(point3, 10));
    }
  }

  calculateTotal(total: string, point1: string, point2: string, point3: string) {
    switch (total) {
      case 'A':
        this.child.totalA = (this.calculateTotalPartial(point1, point2, point3));
        return this.child.totalA = parseFloat((this.child.totalA / 3).toFixed());
        break;
      case 'B':
        this.child.totalB = (this.calculateTotalPartial(point1, point2, point3));
        return this.child.totalB = parseFloat((this.child.totalB / 3).toFixed());
        break;
      case 'C':
        this.child.totalC = (this.calculateTotalPartial(point1, point2, point3));
        return this.child.totalC = parseFloat((this.child.totalC / 3).toFixed());
        break;
      case 'D':
        this.child.totalD = (this.calculateTotalPartial(point1, point2, point3));
        return this.child.totalD = parseFloat((this.child.totalD / 3).toFixed());
        break;
      default:
        break;
    }
  }

  calculateAgeIntMonths() {
    const today = new Date();
    const childBirth = new Date(this.child.birthDate);
    let months = (today.getFullYear() - childBirth.getFullYear()) * 12;
    months -= childBirth.getMonth() + 1;
    months += today.getMonth();
    return months+1;
  }

  goToProfile() {
    this.route.paramMap.subscribe((paramMap: any) => {
      this.id = (paramMap.params.id);
    });
    this.router.navigate(['child/showProgressProfile/' + this.id]);
  }
}
