import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChildMedicalRecordService } from '../../../shared/services/child-medical-record.service';

import { ChildMedicalRecordModel } from '../../../shared/models/child-medical-record.model';

import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-show-medical-record-form',
  templateUrl: './show-medical-record-form.component.html',
  styleUrls: ['./show-medical-record-form.component.css']
})
export class ShowMedicalRecordFormComponent implements OnInit {

  constructor(private childMedicalRecordService: ChildMedicalRecordService, private route: ActivatedRoute, 
    private router: Router, private userService: UserService, private authService: AuthentificationService) { }

  child = new ChildMedicalRecordModel();
  childId: any;
  userList: any = [];
  role: any = {};
  isDisable = false;
  loading = false;

  ngOnInit() {
    this.loading=true;
    this.active()
    setTimeout(() => {
      this.loading = false;
      this.route.paramMap.subscribe((paramMap: any) => {
        this.view(paramMap.params.id);
      });
    }, 300);
    
  }

  view(id: string) {
    this.childId = id;
    this.childMedicalRecordService.getChildMedicalRecordbyId(id).then(child => this.child = child);
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

  editMedicalRecord(child: any) {
    this.childMedicalRecordService.setCreatedObject(child);
    this.router.navigate (['child/editMedicalRecord/' + this.childId]);
  }

  goToProfiles() {
    this.router.navigate(['child/showProfile/' + this.childId]);
  }

  async active() {
    this.authService.getCurrentUser().pipe(
      tap(current => {
        if(current)
          this.userService.getUser().subscribe(item => {
            this.userList = item;
            this.userList.forEach(element => {
              if(current.email == element.email)
              {
                if(element.isDisable)
                  this.isDisable = true;
                switch (element.position) {
                  case 'administrador':
                    this.role = 'admin';
                    break;
                  case 'medico':
                    this.role = 'med';
                    break;
                  case 'psicologo':
                    this.role = 'psico';
                    break;
                  case 'contador':
                    this.role = 'cont';
                    break;
                  default:
                    break;
                }
              }
            });
          });
      })
    ).subscribe();
  }
}
