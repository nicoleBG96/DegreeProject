import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Service
import { ChildRegisterService } from '../../../shared/services/child-register.service';

// Models
import { ChildRegisterModel } from '../../../shared/models/child-register.model';

@Component({
  selector: 'app-child-register-form',
  templateUrl: './child-register-form.component.html',
  styleUrls: ['./child-register-form.component.css']
})
export class ChildRegisterFormComponent implements OnInit {
  myForm: FormGroup;
  isEdit: boolean;
  private receivedObject: any;
  @Input() child: ChildRegisterModel;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmit: EventEmitter<any>;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onEdit: EventEmitter<any>;
  file: File;
  id: any;

  constructor(private childRegisterService: ChildRegisterService, private router: Router, private route: ActivatedRoute) {
    this.onSubmit = new EventEmitter<any>();
    this.onEdit = new EventEmitter<any>();
  }

  ngOnInit() {
    console.log(this.child)
    if (!this.child) {
      this.child = new ChildRegisterModel();
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  save() {
    console.log("SAVE", this.isEdit);
    this.onSubmit.emit(this.child);
  }

  edit(child: any) {
    console.log("EDIT");
    this.onEdit.emit(this.child);
  }

  editChild(child: ChildRegisterModel) {
    if (this.isEdit) {
      this.receivedObject = this.childRegisterService.setCreatedObject(child);
    }
  }

  setImage(event) {
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    this.child.imageFile = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.child.image = reader.result;
    }
    return true;
  }

  goToProfiles() {
    this.router.navigate(['/child/profiles'])
  }

  goToProfile() {
    this.route.paramMap.subscribe((paramMap: any) => {
      this.id = (paramMap.params.id);
    });
    this.router.navigate(['child/showRegisterProfile/' + this.id])
  }

}

