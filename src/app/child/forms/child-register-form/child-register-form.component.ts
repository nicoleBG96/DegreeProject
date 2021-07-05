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
  public myForm: FormGroup;
  public isEdit: boolean;
  private receivedObject: any;
  @Input() public child: ChildRegisterModel;
  @Output() public onSubmit: EventEmitter<any>;
  @Output() public onEdit: EventEmitter<any>;
  public file: File;
  public id: any;

  constructor(private childRegisterService: ChildRegisterService, private router: Router, private route: ActivatedRoute) {
    this.onSubmit = new EventEmitter<any>();
    this.onEdit = new EventEmitter<any>();
  }

  ngOnInit() {
    if (!this.child) {
      this.child = new ChildRegisterModel();
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  public saveChildRegister(): void {
    console.log("SAVE", this.isEdit);
    this.onSubmit.emit(this.child);
  }

  public editChildRegister(): void {
    this.onEdit.emit(this.child);
  }

  public editChild(child: ChildRegisterModel): void {
    if (this.isEdit) {
      this.receivedObject = this.childRegisterService.setRegisterObject(child);
    }
  }

  public chargeImage(event): boolean {
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

  public goToProfiles(): void {
    this.router.navigate(['/child/profiles'])
  }

  public goToProfile(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      this.id = (paramMap.params.id);
    });
    this.router.navigate(['child/showRegisterProfile/' + this.id])
  }

}

