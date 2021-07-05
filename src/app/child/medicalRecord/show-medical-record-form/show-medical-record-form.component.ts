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

  public child = new ChildMedicalRecordModel();
  private childId: any;
  private userList: any = [];
  public role: any = {};
  private isDisable = false;
  public loading = false;

  ngOnInit() {
    this.loading=true;
    this.active()
    setTimeout(() => {
      this.loading = false;
      this.route.paramMap.subscribe((paramMap: any) => {
        this.viewChild(paramMap.params.id);
      });
    }, 300);
    
  }

  private viewChild(id: string): void {
    this.childId = id;
    this.childMedicalRecordService.getChildMedicalRecordbyId(id).then(child => this.child = child);
  }

  public calculateAge(): number {
    const today = new Date();
    const childBirth = new Date(this.child.birthDate);
    let age = today.getFullYear() - childBirth.getFullYear();
    const months = today.getMonth() - childBirth.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < childBirth.getDate())) {
      age--;
    }
    return age;
  }

  public editMedicalRecord(child: any): void {
    this.childMedicalRecordService.setMedicalRecordObject(child);
    this.router.navigate (['child/editMedicalRecord/' + this.childId]);
  }

  public goToProfiles(): void {
    this.router.navigate(['child/showProfile/' + this.childId]);
  }

  private async active(): Promise<void> {
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
                this.getRole(element.position);
              }
            });
          });
      })
    ).subscribe();
  }

  private getRole(position: string): String {
    return (position === 'administrador') ? 'admin' : (position === 'medico') ? 'med' : (position === 'psiocolog') ? 'psico' : 'cont';
  }
}
