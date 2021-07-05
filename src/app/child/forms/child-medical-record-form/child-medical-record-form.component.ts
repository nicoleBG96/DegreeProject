import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


// Model
import { ChildMedicalRecordModel } from '../../../shared/models/child-medical-record.model';

@Component({
  selector: 'app-child-medical-record-form',
  templateUrl: './child-medical-record-form.component.html',
  styleUrls: ['./child-medical-record-form.component.css']
})
export class ChildMedicalRecordFormComponent implements OnInit {
  public myForm: FormGroup;
  public isEdit: boolean;
  public id: any;
  public age: any;
  @Input() public child: ChildMedicalRecordModel;
  @Output() public onSubmit: EventEmitter<any>;
  @Output() public onEdit: EventEmitter<any>;

  constructor( private router: Router, private route: ActivatedRoute) {
    this.onSubmit = new EventEmitter<any>();
    this.onEdit = new EventEmitter<any>();
  }

  ngOnInit() {
    if (!this.child) {
      this.child = new ChildMedicalRecordModel();
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  public calculateAge(date: Date): number {
    const today = new Date();
    const childBirth = new Date(date);
    let age = today.getFullYear() - childBirth.getFullYear();
    const months = today.getMonth() - childBirth.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < childBirth.getDate())) {
      age--;
    }
    return age;
  }

  public saveMedicalRecord(): void {
    this.onSubmit.emit(this.child);
  }

  public editMedicalRecord(): void {
    this.onEdit.emit(this.child);
  }

  public goToProfiles(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      this.id = (paramMap.params.id);
    });
    this.router.navigate(['child/showMedicalRecordProfile/' + this.id]);
  }
}
